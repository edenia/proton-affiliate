#include <affiliatepoc.hpp>

ACTION add_user(name account, uint8_t user_role) {
  // user must be admin or smart contract account to register users
  require_auth(get_self());

  // Init the users table
  referral_users_table _referral_users(get_self(), get_self().value);

  // Find the record from _referrals table
  auto referral_user_itr = _referral_users.find(account.value);
  if (referral_user_itr == _referral_users.end()) {
    // Create a referral user record if it does not exist
    _referral_users.emplace(from, [&](auto& referral_user) {
      referral_user.account = account;
      referral_user.user_role = user_role;
    });
  } else {
    // Modify a referral user record if it exists
    _referral_users.modify(referral_user_itr, account, [&](auto& referral_user) {
      referral_user.user_role = user_role;
    });
  }
}

ACTION create_referral(name invitee, name referrer) {
  // check user is authorized as referrer
  bool is_referer = ( find(referral_users.begin(), referral_users.end(), referrer) != referral_users.end() );

  // check invitee is not a registered account
  if (!is_account(invitee))

  // calculate expires_on date

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
  require_auth(is_admin());

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

ACTION reject_payment(name invitee, string memo) {
  // user must be admin or smart contract account called from backend service
  require_auth(is_admin());

  // Check user is admin 

  // set referal status to PAYMENT_REJECTED

  // delete record to save RAM
  referral.erase(referral_itr);
}

ACTION set_params(symbol token, name reward_account, uint8_t reward_amount, uint64_t expiry_period, bool manual_review) { 
// check user is admin 
require_auth(is_admin());

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
