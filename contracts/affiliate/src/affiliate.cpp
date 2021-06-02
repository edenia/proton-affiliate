#include <affiliate.hpp>
#include <eosio/system.hpp>

ACTION affiliate::addadmin(name admin) {
  //Init the users table
  users_table _users(get_self(), get_self().value);

  //Validate only smart contract can register admin
  eosio::check( is_account( admin ), "Admin is not a registered account");
  auto admin_itr = _users.find( admin.value );
  eosio::check( admin_itr == _users.end(), "Admin Account is already an affiliate" );
  require_auth(get_self());

  //TODO: check account is has KYC

  if (admin_itr == _users.end()) {
    //Create an admin user record if it does not exist
    _users.emplace(get_self(), [&](auto& usr) {
      usr.user = admin;
      usr.role = 1;
    });
  }
}

ACTION affiliate::rmadmin(name admin) {
  //Init the users table
  users_table _users(get_self(), get_self().value);

  //Validate only smart contract can remove admin
  eosio::check( is_account( admin ), "Admin is not a registered account");
  auto admin_itr = _users.find( admin.value );
  eosio::check( admin_itr != _users.end(), "Admin Account is not an affiliate" );
  require_auth(get_self());

  //Delete an admin user record if it exists
  if (admin_itr != _users.end()) {
    _users.erase(admin_itr);
  }
}

ACTION affiliate::adduser(name admin, name user, uint8_t role) {
  //Init the users table
  users_table _users(get_self(), get_self().value);

  //Validate only admin can register referrers
  eosio::check( is_account( admin ), "Admin account does not exist");
  eosio::check( is_account( user ), "User account does not exist");
  eosio::check( admin != user, "Cannot add self as user" );
  auto admin_itr = _users.find( admin.value );
  eosio::check( admin_itr != _users.end(), "Admin Account is not registered" );
  eosio::check( admin_itr->role == user_roles::ADMIN, "You must be an admin to register users");
  require_auth(admin);
  //TODO: check account is has KYC

  //Find the record from _users table
  auto usr_itr = _users.find( user.value );
  if (usr_itr == _users.end()) {
    //Create a referral user record if it does not exist
    _users.emplace(get_self(), [&](auto& usr) {
      usr.user = user;
      usr.role = role;
    });
  } else {
    //Modify user record if it exists
    _users.modify(usr_itr, get_self(), [&](auto& usr) {
      usr.role = role;
    });
  }
}

ACTION affiliate::rmuser(name admin, name user) {
// remove account as an admin 
// TODO: Find out if admins can delete other admins
//Init the users table
users_table _users(get_self(), get_self().value);

//Validate only admins can remove users
  eosio::check( is_account( admin ), "Admin is not a registered account");
  auto admin_itr = _users.find( admin.value );
  eosio::check( admin_itr != _users.end(), "Admin Account is not an affiliate" );
  eosio::check( admin_itr->role == user_roles::ADMIN, "You must be an admin to remove users");
  require_auth(admin);
  auto user_itr = _users.find( user.value );
  //Delete user record if it exists
  if (user_itr != _users.end()) {
    _users.erase(user_itr);
  }
}

ACTION affiliate::addref(name referrer, name invitee) {
  eosio::check( !is_account( invitee ), "Account invited is already registered");
  require_auth(get_self());
  //Init the users table
  users_table _users(get_self(), get_self().value);
  //Init the users table
  referrals_table _referrals(get_self(), get_self().value);
  // check user is authorized as referrer
  auto referrer_itr = _users.find( referrer.value );
  eosio::check( referrer_itr != _users.end(), "Account referring is not an affiliate" );
  // TODO: Can Admins refer users? (other admins approve users they refer? )    

  // Set expiration date
  // TODO: Integrate with expire_period parameters table
  eosio::time_point_sec expiration = eosio::current_time_point() + days(3);

  //Find the record from _referrals table
  auto referrals_itr = _referrals.find( invitee.value );
  if (referrals_itr == _referrals.end()) {
    //Create a referral user record if it does not exist
    _referrals.emplace(get_self(), [&](auto& ref) {
      ref.invitee = invitee;;
      ref.referrer = referrer;
      ref.status = 1; 
      ref.expires_on = expiration;
    });
  }
}

ACTION affiliate::expireref(name invitee) {
  // user must be smart contract account called from backend service
  require_auth(get_self());
  //Init the referrals table
  referrals_table _referrals(get_self(), get_self().value);

  auto referral_itr = _referrals.find(invitee.value);
  eosio::check(referral_itr != _referrals.end(), "Referal does not exist");

  // check if referal is still valid 
  eosio::check( (eosio::time_point_sec) current_time_point() >= referral_itr->expires_on, "Referal has not expired yet");

  // if outside of time perdiod set referal status to EXPIRED 
  _referrals.modify(referral_itr, get_self(), [&](auto& ref) {
      ref.status = 5;
  });

  // TODO : define cleanup method
  // delete record to save RAM
  //_referrals.erase(referral_itr);
}

ACTION affiliate::verifyref(name invitee) {

  require_auth(get_self());
  //Init the users table
  referrals_table _referrals(get_self(), get_self().value);

  //check((eosio::time_point_sec)(current_time_point() >= expires_on, "This referral has expired");
  // user must be smart contract account called from backend service
  //require_auth(get_self()); 

  // check if invitee is in acc column in eosio.proton:usersinfo table

  // if no record is found status remains PENDING_USER_REGISTRATION

  // if verified == 0  set status PENDING_KYC_VERIFICATION 

  // if verified == 1  set status PENDING_PAYMENT
}

ACTION affiliate::payref(name admin, name invitee) {
  //Init the users table
  users_table _users(get_self(), get_self().value);

  //Validate only admins can approve payments
  eosio::check( is_account( admin ), "Admin is not a registered account");
  auto admin_itr = _users.find( admin.value );
  eosio::check( admin_itr != _users.end(), "Admin Account is not an affiliate" );
  eosio::check( admin_itr->role == user_roles::ADMIN, "You must be an admin to pay a referral");
  require_auth(admin);

  // transfer REFERRAL_AMOUNT to invitee and referrer
  //eosio::transaction txn{};
  //txn.actions.emplace_back(
  //    eosio::permission_level(from, N(active)),
  //    N(eosio.token),
  //     N(transfer),
  //    std::make_tuple(from, to, quantity, memo));
  //txn.send(eosio::string_to_name(memo.c_str()), from);

  // set referal status to  PAID

  // delete record to save RAM
  //referral.erase(referral_itr);
}

ACTION affiliate::rejectref(name admin, name invitee, string memo) {
  // memo string is optional and not persisted to tables
  //Init the users table
  users_table _users(get_self(), get_self().value);

  //Validate only admins can remove users
  eosio::check( is_account( admin ), "Admin is not a registered account");
  auto admin_itr = _users.find( admin.value );
  eosio::check( admin_itr != _users.end(), "Admin Account is not an affiliate" );
  eosio::check( admin_itr->role == user_roles::ADMIN, "You must be an admin to reject a referral");
  require_auth(admin);

  // set referal status to PAYMENT_REJECTED

  //Init the referrals table
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

ACTION affiliate::setparams(name setting, string value) {
  // only smart contract account can set params 
  require_auth(get_self());
  // init params table
  params_table _params(get_self(), get_self().value);
  //Find the record from _params table
  auto params_itr = _params.find( setting.value );
  if (params_itr == _params.end()) {
    //Create a new parameter if it dosent exist
    _params.emplace(get_self(), [&](auto& param) {
      param.setting = setting;
      param.value = value;
    });
  } else {
    //Modify a parameter if it exists
    _params.modify(params_itr, get_self(), [&](auto& param) {
      param.value = value;
    });
  }
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

EOSIO_DISPATCH(affiliate, (addadmin)(rmadmin)(adduser)(rmuser)(addref)(expireref)(verifyref)(payref)(rejectref)(setparams)(clear))
