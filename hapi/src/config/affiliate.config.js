module.exports = {
  account: process.env.HAPI_AFFILIATE_ACCOUNT,
  password: process.env.HAPI_AFFILIATE_PASSWORD,
  verifyExpiredInterval: parseInt(
    process.env.HAPI_AFFILIATE_VERIFY_EXPIRED_INTERVAL || 3600
  ),
  clearReferralsInterval: parseInt(
    process.env.HAPI_AFFILIATE_CLEAR_REFERRALS_INTERVAL || 86400
  ),
  setRateInterval: parseInt(
    process.env.HAPI_AFFILIATE_SET_RATE_INTERVAL || 86400
  )
}
