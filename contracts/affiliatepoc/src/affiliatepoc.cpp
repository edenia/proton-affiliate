#include <affiliatepoc.hpp>

ACTION add_user(name admin, name account, uint8_t user_role) {
  // Init the users table
  referalusers_table _referalusers(get_self(), get_self().value);

  // Validate only admin and smart contract can register referrers
  eosio::check( is_account( admin ), "Admin account does not exist");
  eosio::check( is_account( account ), "User account does not exist");
  eosio::check( admin != account, "Cannot add self as user" );
  auto admin_itr = users_table.find( admin.value );
  eosio::check( admin_itr != users_table.end(), "Admin Account is not registered" );
  eosio::check( admin_itr->user_role != user_role::ADMIN, "You must be an admin to register users");
  require_auth(admin);

  // Find the record from _referrals table
  auto account_itr = users_table.find( account.value );
  if (account_itr == _referalusers.end()) {
    // Create a referral user record if it does not exist
    _referralusers.emplace(account, [&](auto& account) {
      referraluser.account = account;
      referraluser.user_role = user_role;
    });
  } else {
    // Modify a referral user record if it exists
    _referralusers.modify(account_itr, account, [&](auto& account) {
      referraluser.user_role = user_role;
    });
  }
}

ACTION create_referral(name invitee, name referrer) {
  // check user is authorized as referrer
  bool is_referer = ( find(referral_users.begin(), referral_users.end(), referrer) != referral_users.end() );
  require_auth(referrer);

  // check invitee is not a registered account
  eosio::check( !is_account( invitee ), "Invitee account is already registered");

  // get current time
  time_point eosio::current_time_point()
  
  // add 72 hours to calculate expiry date
  expires_on = time_point + 259200000

  // set status to PENDING_USER_REGISTRATION

  // register invitee account name
}

ACTION expire_referral(name ivitee) {
  // user must be smart contract account called from backend service
  require_auth(get_self());

  // Init the referals table
  referals _referral_table(get_self(), get_self().value);

  auto itr = referals.find(ivitee.value);
  eosio::check(itr != referals.end(), "Referal does not exist");

  // check if expires_on is >= .now()  

    time_point eosio::current_time_point()

  // if outside of time perdiod set referal status to EXPIRED 

  // delete record to save RAM
  referral.erase(referral_itr);
}

ACTION verify_referral(name invitee) {
  // user must be smart contract account called from backend service
  require_auth(get_self()); 

  // check if invitee is in acc column in eosio.proton:usersinfo table

  // if no record is found status remains PENDING_USER_REGISTRATION

  // if verified == 0  set status PENDING_KYC_VERIFICATION 

  // if verified == 1  set status PENDING_PAYMENT
}

ACTION pay_referral(name invitee) {
  // user must be admin or smart contract account called from backend service
  require_auth(get_self());

  // transfer REFERRAL_AMOUNT to invitee and referrer
  eosio::transaction txn{};
  txn.actions.emplace_back(
      eosio::permission_level(from, N(active)),
      N(eosio.token),
      N(transfer),
      std::make_tuple(from, to, quantity, memo));
  txn.send(eosio::string_to_name(memo.c_str()), from);

  // set referal status to  PAID

  // delete record to save RAM
  referral.erase(referral_itr);
}

ACTION reject_payment(name admin, name invitee, string memo) {
  // user must be admin or smart contract account called from backend service
  require_auth(admin);

  // memo string is optional and not persisted to tables

  // set referal status to PAYMENT_REJECTED

  // delete record to save RAM
  referral.erase(referral_itr);
}

ACTION set_params(symbol token, name reward_account, uint8_t reward_amount, uint64_t expiry_period, bool manual_review) { 
// only smart contract account can set params 
require_auth(get_self());

// update params table
}

ACTION affiliatepoc::clear() {
  require_auth(get_self());

  referrals_table _referrals(get_self(), get_self().value);

  // Delete all records in _referrals table
  auto referal_itr = _referrals.begin();
  while (referal_itr != _referrals.end()) {
    referal_itr = _referrals.erase(referal_itr);
  }
}

EOSIO_DISPATCH(affiliatepoc, (add_user)(create_referral)(expire_referral)(verify_referral)(pay_referral)(reject_payment)(set_params)(clear))