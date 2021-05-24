#include <affiliatepoc.hpp>

ACTION affiliatepoc::refer(name referrer, string uuid) {
  require_auth(referrer);

  // Init the referrals table
  referrals_table _referrals(get_self(), get_self().value);

  // Find the record from _referrals table
  auto referal_itr = _referrals.find(referrer.value);
  if (referal_itr == _referrals.end()) {
    // Create a referral record if it does not exist
    _referrals.emplace(from, [&](auto& referal) {
      referal.referer = referer;
      referal.uuid = uuid;
    });
  } else {
    // Modify a referral record if it exists
    _referrals.modify(referal_itr, from, [&](auto& referal) {
      referal.uuid = uuid;
    });
  }
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

EOSIO_DISPATCH(affiliatepoc, (refer)(clear))
