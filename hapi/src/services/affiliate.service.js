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
  setRate
}
