const { affiliateConfig } = require('../../../config')
const { eosUtil } = require('../../../utils')
const affiliateService = require('../../affiliate.service')

module.exports = {
  actionType: 'eosio::newaccount',
  apply: async (state, payload) => {
    console.log(`new account found ${payload.data.name}`)
    const { rows } = await eosUtil.getTableRows({
      code: affiliateConfig.account,
      scope: affiliateConfig.account,
      table: 'referrals',
      json: true,
      lower_bound: payload.data.name,
      upper_bound: payload.data.name
    })

    if (!rows.length) {
      console.log(`none referral exits with invitee ${payload.data.name}`)
      return
    }

    const referral = rows[0]

    if (referral.status !== 1) {
      console.log(
        `referral with invitee ${payload.data.name} it's already validated`
      )
      return
    }

    try {
      const transaction = await affiliateService.verifyAccount(referral.invitee)
      console.log(`success verify account: trxid ${transaction.processed.id}`)
    } catch (error) {
      console.error(`error on verify account: ${error.message}`)
    }
  }
}
