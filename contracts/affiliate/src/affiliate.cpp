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
  eosio::check( admin_itr == _users.end(), "Admin Account is not an affiliate" );
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

  //Find the record from _referrals table
  auto usr_itr = _users.find( user.value );
  if (usr_itr == _users.end()) {
    //Create a referral user record if it does not exist
    _users.emplace(get_self(), [&](auto& usr) {
      usr.user = user;
      usr.role = role;
    });
  } else {
    //Modify a referral user record if it exists
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
  eosio::check( admin_itr == _users.end(), "Admin Account is not an affiliate" );
  eosio::check( admin_itr->role == user_roles::ADMIN, "You must be an admin to remove users");
  require_auth(admin);

  //Delete an admin user record if it exists
  if (admin_itr != _users.end()) {
    _users.erase(admin_itr);
  }
}

ACTION affiliate::addref(name referrer, name invitee) {
  eosio::check( !is_account( invitee ), "Account invited is already registered");
  require_auth(referrer);
  //Init the users table
  users_table _users(get_self(), get_self().value);
  //Init the users table
  referrals_table _referrals(get_self(), get_self().value);
  // check user is authorized as referrer
  auto referrer_itr = _users.find( referrer.value );
  eosio::check( referrer_itr != _users.end(), "Account referring is not an affiliate" );
  // TODO: Can Admins refer users? (other admins approve users they refer? )    

  //get current time 
  eosio::time_point_sec tp = eosio::current_time_point();
  // TODO: add expiration time to tp

  //Find the record from _referrals table
  auto referrals_itr = _referrals.find( invitee.value );
  if (referrals_itr == _referrals.end()) {
    //Create a referral user record if it does not exist
    _referrals.emplace(get_self(), [&](auto& ref) {
      ref.invitee = invitee;;
      ref.referrer = referrer;
      ref.status = 1; 
      ref.expires_on = tp;
    });
  }
}

ACTION affiliate::expireref(name invitee) {
  // user must be smart contract account called from backend service
  // require_auth(get_self());

  // Init the referals table
  //referals _referral_table(get_self(), get_self().value);

  //auto itr = referals.find(ivitee.value);
  //eosio::check(itr != referals.end(), "Referal does not exist");

  // check if expires_on is >= .now()  

  //time_point eosio::current_time_point()

  // if outside of time perdiod set referal status to EXPIRED 

  // delete record to save RAM
  //referral.erase(referral_itr);
}

ACTION affiliate::verifyref(name invitee) {
  // user must be smart contract account called from backend service
  //require_auth(get_self()); 

  // check if invitee is in acc column in eosio.proton:usersinfo table

  // if no record is found status remains PENDING_USER_REGISTRATION

  // if verified == 0  set status PENDING_KYC_VERIFICATION 

  // if verified == 1  set status PENDING_PAYMENT
}

ACTION affiliate::payref(name invitee) {
  // user must be admin or smart contract account called from backend service
  //require_auth(get_self());

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
  // user must be admin or smart contract account called from backend service
  //require_auth(admin);

  // memo string is optional and not persisted to tables

  // set referal status to PAYMENT_REJECTED

  // delete record to save RAM
 // referral.erase(referral_itr);
}

ACTION affiliate::setparams(name reward_account, string token, uint8_t reward_amount, uint32_t expiry_period, bool manual_review) {
// only smart contract account can set params 
require_auth(get_self());

// update params table

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
