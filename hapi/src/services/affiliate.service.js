const { affiliateConfig } = require('../config')
const { eosUtil } = require('../utils')

const exchangeService = require('./exchange.service')

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

const checkKyc = async acc => {
  const { rows } = await eosUtil.getTableRows({
    code: 'eosio.proton',
    scope: 'eosio.proton',
    table: 'usersinfo',
    lower_bound: acc,
    upper_bound: acc
  })

  return !!rows[0]?.kyc?.length
}

const isAccountValidAsInvitee = async account => {
  if (!account) {
    return false
  }

  try {
    const data = await eosUtil.getAccount(account)

    return !data
  } catch (error) {}

  return true
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

const setRate = async () => {
  const rate = await exchangeService.getRate('bitcoin', 'usd')
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
        data: {
          btc_usdt: rate
        }
      }
    ],
    affiliateConfig.account,
    affiliateConfig.password
  )

  return transaction
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

const addReferral = async data => {
  const transaction = await eosUtil.transact(
    [
      {
        data,
        authorization: [
          {
            actor: affiliateConfig.account,
            permission: 'active'
          }
        ],
        account: affiliateConfig.account,
        name: 'addref'
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

const clearReferralsWorker = () => {
  return {
    name: 'CLEAR REFERRALS',
    interval: affiliateConfig.clearReferralsInterval,
    action: clearReferrals
  }
}

const setRateWorker = () => {
  return {
    name: 'SET RATE',
    interval: affiliateConfig.setRateInterval,
    action: setRate
  }
}

module.exports = {
  checkKyc,
  isAccountValidAsInvitee,
  verifyAccount,
  verifyKYC,
  verifyExpired,
  setRate,
  clearReferrals,
  addReferral,
  verifyExpiredWorker,
  clearReferralsWorker,
  setRateWorker
}
