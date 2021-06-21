/*
*
* @author  EOSCostaRica.io [ https://eoscostarica.io ]
*
* @section DESCRIPTION
*  Header file for the declaration of all functions related with the affiliate contract
*
*    GitHub:         https://github.com/eoscostarica/proton-affiliate
*
*/

#include <affiliate.hpp>
#include <eosio/system.hpp>

ACTION affiliate::addadmin(name admin) {
  require_auth(get_self());

  check(is_account(admin), admin.to_string() + " account is not a registered account");
  users_table _users(get_self(), get_self().value);

  auto admin_itr = _users.find(admin.value);
  check(admin_itr == _users.end(), admin.to_string() + " account is already an affiliate");
  check(has_valid_kyc(admin), "KYC for " + admin.to_string() + " is not verified");

  if (admin_itr == _users.end()) {
    _users.emplace(get_self(), [&](auto& usr) {
      usr.user = admin;
      usr.role = user_roles::ADMIN;
    });
  }
}

ACTION affiliate::rmadmin(name admin) {
  require_auth(get_self());

  users_table _users(get_self(), get_self().value);
  auto admin_itr = _users.find(admin.value);
  check(admin_itr != _users.end(), admin.to_string() + " account is not an affiliate");
  check(admin_itr->role == user_roles::ADMIN, admin.to_string() + " account is not an admin");
  
  if (admin_itr != _users.end()) {
    _users.erase(admin_itr);
  }
}

ACTION affiliate::adduser(name admin, name user, uint8_t role) {
  require_auth(admin);

  check(admin != user, "cannot add self as user");
  check(is_account(user), user.to_string() + " account does not exist");
  check(role != user_roles::ADMIN, "role not allowed");
  check(has_valid_kyc(user), "KYC for " + user.to_string() + " is not verified");
  
  users_table _users(get_self(), get_self().value);
  auto admin_itr = _users.find(admin.value);
  check(admin_itr != _users.end(), admin.to_string() + " account is not an affiliate");
  check(admin_itr->role == user_roles::ADMIN, admin.to_string() + " account is not an admin");

  auto usr_itr = _users.find(user.value);

  if (usr_itr == _users.end()) {
    _users.emplace(get_self(), [&](auto& usr) {
      usr.user = user;
      usr.role = role;
    });
  } else {
    _users.modify(usr_itr, get_self(), [&](auto& usr) {
      usr.role = role;
    });
  }
}

ACTION affiliate::rmuser(name admin, name user) {
  require_auth(admin);

  users_table _users(get_self(), get_self().value);
  auto admin_itr = _users.find(admin.value);
  check(admin_itr != _users.end(), admin.to_string() + " account is not registered");
  check(admin_itr->role == user_roles::ADMIN, admin.to_string() + " account is not an admin");

  auto user_itr = _users.find(user.value);
  check(user_itr->role != user_roles::ADMIN, admin.to_string() + " account is an admin");

  if (user_itr != _users.end()) {
    _users.erase(user_itr);
  }
}

ACTION affiliate::addref(name referrer, name invitee) {
  require_auth(get_self());

  users_table _users(get_self(), get_self().value);
  auto referrer_itr = _users.find(referrer.value);
  check(referrer_itr != _users.end(), referrer.to_string() + " account is not an affiliate");
  check(referrer_itr->role == user_roles::REFERRER, referrer.to_string() + " account is not a referrer");

  check(!is_account(invitee), invitee.to_string() + " account is already registered");
  referrals_table _referrals(get_self(), get_self().value);
  auto referrals_itr = _referrals.find(invitee.value);
  check(referrals_itr == _referrals.end(), invitee.to_string() + " account already have a referral");

  params_table _params(get_self(), get_self().value);
  auto params_data = _params.get_or_create(get_self());
  time_point_sec expiration = current_time_point() + days(params_data.expiration_days);
  _referrals.emplace(get_self(), [&](auto& ref) {
    ref.invitee = invitee;
    ref.referrer = referrer;
    ref.status = referral_status::PENDING_USER_REGISTRATION;
    ref.expires_on = expiration;
  });
  SEND_INLINE_ACTION(*this, addreflog, { {get_self(), name("active")} }, { referrer, invitee, referral_status::PENDING_USER_REGISTRATION, expiration });
}

ACTION affiliate::verifyacc(name invitee) {
  require_auth(get_self());
  check(is_account(invitee), invitee.to_string() + " invitee is not a registered account yet");
  
  referrals_table _referrals(get_self(), get_self().value);
  auto _referral = _referrals.find(invitee.value);
  check(_referral != _referrals.end(), "referral with invitee " + invitee.to_string() + " does not exist");
  check(_referral->status == referral_status::PENDING_USER_REGISTRATION, "invalid status for invitee " + invitee.to_string() + " referral");
  check(_referral->expires_on > current_time_point(), "referral already expired for invitee " + invitee.to_string());

  _referrals.modify(_referral, get_self(), [&](auto& row) {
    row.status = referral_status::PENDING_KYC_VERIFICATION;
  });
  SEND_INLINE_ACTION(*this, statuslog, { {get_self(), name("active")} }, { invitee, referral_status::PENDING_KYC_VERIFICATION });
}

ACTION affiliate::verifykyc(name invitee) {
  require_auth(get_self());

  referrals_table _referrals(get_self(), get_self().value);
  auto _referral = _referrals.find(invitee.value);
  check(_referral != _referrals.end(), "referral with invitee " + invitee.to_string() + " does not exist");
  check(_referral->status == referral_status::PENDING_KYC_VERIFICATION, "invalid status for invitee " + invitee.to_string() + " referral");
  check(_referral->expires_on > current_time_point(), "referral already expired for invitee " + invitee.to_string());
  check(has_valid_kyc(invitee), "KYC for " + invitee.to_string() + " is not verified");

  _referrals.modify(_referral, get_self(), [&](auto& row) {
    row.status = referral_status::PENDING_PAYMENT;
  });
  SEND_INLINE_ACTION(*this, statuslog, { {get_self(), name("active")} }, { invitee, referral_status::PENDING_PAYMENT });
}

ACTION affiliate::verifyexp() {
  require_auth(get_self());

  referrals_table _referrals(get_self(), get_self().value);
  auto expires_on_index = _referrals.get_index<name("expireson")>();

  for (auto itr = expires_on_index.begin(); itr != expires_on_index.upper_bound(current_time_point().sec_since_epoch()); itr++) {
    if (itr->status >= referral_status::PENDING_PAYMENT) {
      continue;
    }

    _referrals.modify(*itr, get_self(), [&](auto& ref) {
      ref.status = referral_status::EXPIRED;
    });
    SEND_INLINE_ACTION(*this, statuslog, { {get_self(), name("active")} }, { itr->invitee, referral_status::EXPIRED });
  }
}

ACTION affiliate::payref(name admin, name invitee) {
  require_auth(admin);

  users_table _users(get_self(), get_self().value);
  auto admin_itr = _users.find(admin.value);
  check(admin_itr != _users.end(), admin.to_string() + " account is not an affiliate");
  check(admin_itr->role == user_roles::ADMIN, admin.to_string() + " account is not an admin");

  referrals_table _referrals(get_self(), get_self().value);
  auto _referral = _referrals.find(invitee.value);
  check(_referral != _referrals.end(), "referral with invitee " + invitee.to_string() + " does not exist");
  check(_referral->status == referral_status::PENDING_PAYMENT, "invalid status for invitee " + invitee.to_string() + " referral");
  check(_referral->expires_on > current_time_point(), "referral already expired for invitee " + invitee.to_string());

  params_table _params(get_self(), get_self().value);
  auto params_data = _params.get_or_create(get_self());
  action(
    permission_level {
      get_self(), name("payout")
    },
    name("eosio.token"),
    name("transfer"),
    std::make_tuple(
      params_data.payer,
      _referral->invitee,
      params_data.asset_reward_amount,
      "Referral payment from referrer account: " 
        + _referral->referrer.to_string() 
        + " ($" 
        + to_string(params_data.usd_reward_amount) 
        + " at " 
        + to_string(params_data.rate) 
        + ")"
    )
  ).send();
  action(
    permission_level {
      get_self(), name("payout")
    },
    name("eosio.token"),
    name("transfer"),
    std::make_tuple(
      params_data.payer,
      _referral->referrer,
      params_data.asset_reward_amount,
      "Referral payment for new account: " 
        + invitee.to_string() 
        + " ($" 
        + to_string(params_data.usd_reward_amount) 
        + " at " 
        + to_string(params_data.rate) 
        + ")"
    )
  ).send();

  _referrals.modify(_referral, get_self(), [&](auto & row) {
    row.status = referral_status::PAID;
  });
  SEND_INLINE_ACTION(*this, statuslog, { {get_self(), name("active")} }, { invitee, referral_status::PAID });
}

ACTION affiliate::rejectref(name admin, name invitee, string memo) {
  require_auth(admin);

  users_table _users(get_self(), get_self().value);
  auto admin_itr = _users.find(admin.value);
  check(admin_itr != _users.end(), admin.to_string() + " account is not an affiliate");
  check(admin_itr->role == user_roles::ADMIN, admin.to_string() + " account is not an admin");

  referrals_table _referrals(get_self(), get_self().value);
  auto _referral = _referrals.find(invitee.value);
  check(_referral != _referrals.end(), "referral with invitee " + invitee.to_string() + " does not exist");
  check(_referral->status == referral_status::PENDING_PAYMENT, "invalid status for invitee " + invitee.to_string() + " referral");

  _referrals.modify(_referral, get_self(), [&](auto& ref) {
    ref.status = referral_status::PAYMENT_REJECTED;
  });
  SEND_INLINE_ACTION(*this, statuslog, { {get_self(), name("active")} }, { invitee, referral_status::PAYMENT_REJECTED });
}

ACTION affiliate::setparams(name payer, double rate, double usd_reward_amount, uint8_t expiration_days) {
  require_auth(get_self());

  params_table _params(get_self(), get_self().value);
  auto data = _params.get_or_create(get_self());
  data.payer = payer;
  data.rate = rate;
  data.usd_reward_amount = usd_reward_amount;
  data.asset_reward_amount = asset((usd_reward_amount / rate) * 10000, symbol("XPR", 4));
  data.expiration_days = expiration_days;
  _params.set(data, get_self());
}

ACTION affiliate::setrate(double rate) {
  require_auth(get_self());

  params_table _params(get_self(), get_self().value);
  auto data = _params.get_or_create(get_self());
  data.rate = rate;
  data.asset_reward_amount = asset((data.usd_reward_amount / rate) * 10000, symbol("XPR", 4));
  _params.set(data, get_self());
}

ACTION affiliate::clearref() {
  require_auth(get_self());

  referrals_table _referrals(get_self(), get_self().value);
  auto status_index = _referrals.get_index<name("status")>();
  auto itr = status_index.lower_bound(referral_status::PAYMENT_REJECTED);

  while (itr != status_index.upper_bound(referral_status::PAID))
  {
    itr = status_index.erase(itr);
  }
}

ACTION affiliate::addreflog(name referrer,name invitee, uint8_t status, time_point_sec expires_on) {
  require_auth(get_self());
}

ACTION affiliate::statuslog(name invitee, uint8_t status) {
  require_auth(get_self());
}

ACTION affiliate::clear() {
  require_auth(get_self());

  // delete all records in params table
  params_table _params(get_self(), get_self().value);
  _params.remove();

  // delete all records in referrals table
  referrals_table _referrals(get_self(), get_self().value);
  auto referal_itr = _referrals.begin();

  while (referal_itr != _referrals.end()) {
    referal_itr = _referrals.erase(referal_itr);
  }

  // delete all records in users table
  users_table _users(get_self(), get_self().value);
  auto user_itr = _users.begin();

  while (user_itr != _users.end()) {
    user_itr = _users.erase(user_itr);
  }
}

bool affiliate::has_valid_kyc (name account) {
  usersinfo_table _usersinfo(name("eosio.proton"), name("eosio.proton").value);
  auto _userinfo = _usersinfo.find(account.value);
  
  if (_userinfo == _usersinfo.end()) {
    return false;
  }

  return _userinfo->verified;
}