const { affiliateConfig } = require('../../../config')
const { eosUtil } = require('../../../utils')
const affiliateService = require('../../affiliate.service')

module.exports = {
  actionType: 'eosio.proton::userverify',
  apply: async (state, payload) => {
    console.log(`new userverify found ${payload.data.acc}`)

    if (payload.data.verified) {
      console.log(`${payload.data.acc} it's not verified`)
      return
    }

    // @todo: add helper function to get a referral by invitee
    const { rows } = await eosUtil.getTableRows({
      code: affiliateConfig.account,
      scope: affiliateConfig.account,
      table: 'referrals',
      json: true,
      lower_bound: payload.data.acc,
      upper_bound: payload.data.acc
    })

    if (!rows.length) {
      console.log(`none referral exits with invitee ${payload.data.acc}`)
      return
    }

    const referral = rows[0]

    try {
      const transaction = await affiliateService.verifyKYC(referral.invitee)
      console.log(`success verify kyc: trxid ${transaction.processed.id}`)
    } catch (error) {
      console.error(`error on verify kyc: ${error.message}`)
    }
  }
}
