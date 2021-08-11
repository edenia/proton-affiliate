const { affiliateConfig } = require('../../../config')
const referralsService = require('../../referrals.service')
const { eosUtil } = require('../../../utils')

module.exports = {
  type: `${affiliateConfig.account}:payref`,
  apply: async action => {
    try {
      const refferral = await referralsService.findByInvitee(
        action.data.invitee
      )
      const traces = await eosUtil.getTransactionTraces(action.transaction_id)
      const inviteePayment = traces.find(
        trace =>
          trace.act.name === 'transfer' &&
          trace.receipt.receiver === refferral.invitee
      ).act.data
      const referrerPayment = traces.find(
        trace =>
          trace.act.name === 'transfer' &&
          trace.receipt.receiver === refferral.referrer
      ).act.data

      await referralsService.addHistory({
        invitee: action.data.invitee,
        block_num: action.block,
        block_time: action.timestamp,
        contract: action.contract,
        action: action.action,
        actors: action.actors,
        trxid: action.transaction_id,
        payload: { ...action.data, inviteePayment, referrerPayment }
      })
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
