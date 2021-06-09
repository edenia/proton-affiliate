/*##################################
#
#
# Created by EOSCostaRica.io
#
#
##################################*/

#include <affiliate.hpp>
#include <eosio/system.hpp>

ACTION affiliate::addadmin(name admin) {
  users_table _users(get_self(), get_self().value);

  eosio::check( is_account( admin ), "Admin is not a registered account");
  auto admin_itr = _users.find( admin.value );
  eosio::check( admin_itr == _users.end(), "Admin Account is already an affiliate" );
  require_auth(get_self());

  //TODO: check account has KYC

  if (admin_itr == _users.end()) {
    _users.emplace(get_self(), [&](auto& usr) {
      usr.user = admin;
      usr.role = 1;
    });
  }
}

ACTION affiliate::rmadmin(name admin) {
  users_table _users(get_self(), get_self().value);

  eosio::check( is_account( admin ), "Admin is not a registered account");
  auto admin_itr = _users.find( admin.value );
  eosio::check( admin_itr != _users.end(), "Admin Account is not an affiliate" );
  require_auth(get_self());

  if (admin_itr != _users.end()) {
    _users.erase(admin_itr);
  }
}

ACTION affiliate::adduser(name admin, name user, uint8_t role) {
  users_table _users(get_self(), get_self().value);

  eosio::check( is_account( admin ), "Admin account does not exist");
  eosio::check( is_account( user ), "User account does not exist");
  eosio::check( admin != user, "Cannot add self as user" );
  auto admin_itr = _users.find( admin.value );
  eosio::check( admin_itr != _users.end(), "Admin Account is not registered" );
  eosio::check( admin_itr->role == user_roles::ADMIN, "You must be an admin to register users");
  require_auth(admin);
  //TODO: check account has KYC

  auto usr_itr = _users.find( user.value );
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
// remove account as an admin 
// TODO: Find out if admins can delete other admins

users_table _users(get_self(), get_self().value);

  eosio::check( is_account( admin ), "Admin is not a registered account");
  auto admin_itr = _users.find( admin.value );
  eosio::check( admin_itr != _users.end(), "Admin Account is not an affiliate" );
  eosio::check( admin_itr->role == user_roles::ADMIN, "You must be an admin to remove users");
  require_auth(admin);
  auto user_itr = _users.find( user.value );
  if (user_itr != _users.end()) {
    _users.erase(user_itr);
  }
}

ACTION affiliate::addref(name referrer, name invitee) {
  require_auth(get_self());
  eosio::check( !is_account( invitee ), "Account invited " + invitee.to_string() + " is already registered");
  users_table _users(get_self(), get_self().value);
  referrals_table _referrals(get_self(), get_self().value);
  auto referrer_itr = _users.find( referrer.value );
  eosio::check( referrer_itr != _users.end(), "Account referring is not an affiliate" );
  // TODO: Can Admins refer users? (other admins approve users they refer? )    

  // TODO: Integrate with expire_period parameters table
  eosio::time_point_sec expiration = eosio::current_time_point() + days(3);

  auto referrals_itr = _referrals.find( invitee.value );
  if (referrals_itr == _referrals.end()) {
    _referrals.emplace(get_self(), [&](auto& ref) {
      ref.invitee = invitee;;
      ref.referrer = referrer;
      ref.status = 1; 
      ref.expires_on = expiration;
    });
  }
}

ACTION affiliate::expireref(name invitee) {
  require_auth(get_self());
  referrals_table _referrals(get_self(), get_self().value);

  auto referral_itr = _referrals.find(invitee.value);
  eosio::check(referral_itr != _referrals.end(), "Referal does not exist");
  eosio::check( (eosio::time_point_sec) current_time_point() >= referral_itr->expires_on, "Referal has not expired yet");

  _referrals.modify(referral_itr, get_self(), [&](auto& ref) {
      ref.status = 5;
  });

  // TODO : define cleanup method
  // delete record to save RAM
  //_referrals.erase(referral_itr);
}

ACTION affiliate::verifyacc(name invitee) {
  require_auth(get_self());
  check(is_account(invitee), invitee.to_string() + " invitee is not a registered account yet");
  
  referrals_table _referrals(get_self(), get_self().value);
  auto _referral = _referrals.find(invitee.value);
  check(_referral != _referrals.end(), "referral with invitee " + invitee.to_string() + " does not exist");
  check(_referral->status == referral_status::PENDING_USER_REGISTRATION, "invalid status for invitee " + invitee.to_string() + " referral");
  check(_referral->expires_on > eosio::current_time_point(), "referral already expired for invitee " + invitee.to_string());

  _referrals.modify(_referral, get_self(), [&]( auto& row ) {
    row.status = referral_status::PENDING_KYC_VERIFICATION;
  });
}

ACTION affiliate::verifykyc(name invitee) {
  require_auth(get_self());

  referrals_table _referrals(get_self(), get_self().value);
  auto _referral = _referrals.find(invitee.value);
  check(_referral != _referrals.end(), "referral with invitee " + invitee.to_string() + " does not exist");
  check(_referral->status == referral_status::PENDING_KYC_VERIFICATION, "invalid status for invitee " + invitee.to_string() + " referral");
  check(_referral->expires_on > eosio::current_time_point(), "referral already expired for invitee " + invitee.to_string());

  usersinfo_table _usersinfo(name("eosio.proton"), name("eosio.proton").value);
  auto _userinfo = _usersinfo.find(invitee.value);
  check(_userinfo != _usersinfo.end(), "userinfo for " + invitee.to_string() + " does not exist");
  check(_userinfo->verified, "userinfo for " + invitee.to_string() + " it's not verified");

  _referrals.modify(_referral, get_self(), [&]( auto& row ) {
    row.status = referral_status::PENDING_PAYMENT;
  });
}

ACTION affiliate::payref(name admin, name invitee) {
  require_auth(admin);
  users_table _users(get_self(), get_self().value);
  auto admin_itr = _users.find(admin.value);
  check(admin_itr != _users.end(), "Admin " + admin.to_string() + " is not an affiliate");
  check(admin_itr->role == user_roles::ADMIN, "You must be an admin to pay a referral");

  referrals_table _referrals(get_self(), get_self().value);
  auto _referral = _referrals.find(invitee.value);
  check(_referral != _referrals.end(), "referral with invitee " + invitee.to_string() + " does not exist");
  check(_referral->status == referral_status::PENDING_PAYMENT, "invalid status for invitee " + invitee.to_string() + " referral");
  check(_referral->expires_on > eosio::current_time_point(), "referral already expired for invitee " + invitee.to_string());

  params_table _params(get_self(), get_self().value);
  auto params_data = _params.get_or_create(get_self());
  action(
    permission_level {
      get_self(), name("active")
    },
    name("eosio.token"),
    name("transfer"),
    std::make_tuple(
      params_data.payer,
      _referral->invitee,
      params_data.reward_amount,
      "Referral payment for new account: " + invitee.to_string()
    )
  ).send();
  action(
    permission_level {
      get_self(), name("active")
    },
    name("eosio.token"),
    name("transfer"),
    std::make_tuple(
      params_data.payer,
      _referral->referrer,
      params_data.reward_amount,
      "Referral payment for new account: " + invitee.to_string()
    )
  ).send();

  _referrals.modify(_referral, get_self(), [&](auto & row) {
    row.status = referral_status::PAID;
  });
}

ACTION affiliate::rejectref(name admin, name invitee, string memo) {
  // memo string is optional and not persisted to tables
  users_table _users(get_self(), get_self().value);

  eosio::check( is_account( admin ), "Admin is not a registered account");
  auto admin_itr = _users.find( admin.value );
  eosio::check( admin_itr != _users.end(), "Admin Account is not an affiliate" );
  eosio::check( admin_itr->role == user_roles::ADMIN, "You must be an admin to reject a referral");
  require_auth(admin);

  referrals_table _referrals(get_self(), get_self().value);

  auto referral_itr = _referrals.find(invitee.value);
  eosio::check(referral_itr != _referrals.end(), "Referal does not exist");

  // set referal status to PAYMENT_REJECTED 
  _referrals.modify(referral_itr, get_self(), [&](auto& ref) {
      ref.status = 4;
  });

  // TODO : define cleanup method
  // delete record to save RAM
  // _referrals.erase(referral_itr);
}

ACTION affiliate::setparams(name payer, asset reward_amount, uint8_t expiration_days) {
  require_auth(get_self());
  params_table _params(get_self(), get_self().value);
  auto data = _params.get_or_create(get_self());
  data.payer = payer;
  data.reward_amount = reward_amount;
  data.expiration_days = expiration_days;
  _params.set(data, get_self());
}

ACTION affiliate::clear() {
  require_auth(get_self());

  referrals_table _referrals(get_self(), get_self().value);

  // Delete all records in users table
  auto referal_itr = _referrals.begin();
  while (referal_itr != _referrals.end()) {
    referal_itr = _referrals.erase(referal_itr);
  }

  users_table _users(get_self(), get_self().value);

  // Delete all records in users table
  auto user_itr = _users.begin();
  while (user_itr != _users.end()) {
    user_itr = _users.erase(user_itr);
  }
}
