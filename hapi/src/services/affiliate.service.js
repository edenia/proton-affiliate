const { affiliateConfig } = require('../config')
const { eosUtil } = require('../utils')

const verifyAccount = async invitee => {
  const transaction = await eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: affiliateConfig.account,
            permission: 'verify'
          }
        ],
        account: affiliateConfig.account,
        name: 'verifyacc',
        data: { invitee }
      }
    ],
    affiliateConfig.account,
    affiliateConfig.password
  )

  return transaction
}

const verifyKYC = async invitee => {
  const transaction = await eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: affiliateConfig.account,
            permission: 'verify'
          }
        ],
        account: affiliateConfig.account,
        name: 'verifykyc',
        data: { invitee }
      }
    ],
    affiliateConfig.account,
    affiliateConfig.password
  )

  return transaction
}

const verifyExpired = async () => {
  const transaction = await eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: affiliateConfig.account,
            permission: 'active'
          }
        ],
        account: affiliateConfig.account,
        name: 'verifyexp',
        data: {}
      }
    ],
    affiliateConfig.account,
    affiliateConfig.password
  )

  return transaction
}

const verifyExpiredWorker = () => {
  return {
    name: 'VERIFY EXPIRATION',
    interval: affiliateConfig.verifyExpiredInterval,
    action: verifyExpired
  }
}

const clearReferrals = async () => {
  const transaction = await eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: affiliateConfig.account,
            permission: 'active'
          }
        ],
        account: affiliateConfig.account,
        name: 'clearref',
        data: {}
      }
    ],
    affiliateConfig.account,
    affiliateConfig.password
  )

  return transaction
}

const clearReferralsWorker = () => {
  return {
    name: 'CLEAR REFERRALS',
    interval: affiliateConfig.clearReferralsInterval,
    action: clearReferrals
  }
}

const setRate = async rate => {
  const transaction = await eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: affiliateConfig.account,
            permission: 'setrate'
          }
        ],
        account: affiliateConfig.account,
        name: 'setrate',
        data: { rate }
      }
    ],
    affiliateConfig.account,
    affiliateConfig.password
  )

  return transaction
}

module.exports = {
  verifyAccount,
  verifyKYC,
  verifyExpired,
  verifyExpiredWorker,
  clearReferrals,
  clearReferralsWorker,
  setRate
}
