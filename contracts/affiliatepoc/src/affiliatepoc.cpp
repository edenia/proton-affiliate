#include <affiliatepoc.hpp>

ACTION add_user(name account, uint8_t user_role) {
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


}

ACTION expire_referral(name ivitee) {


}

ACTION verify_referral(name invitee) {

}

ACTION pay_referral(name invitee) {

}

ACTION set_params(symbol token, name reward_account, uint8_t reward_amount, uint64_t expiry_period, bool manual_review) { 

// check user is admin 

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

EOSIO_DISPATCH(affiliatepoc, (add_user)(create_referral)(expire_referral)(verify_referral)(pay_referral)(set_params)(clear))
