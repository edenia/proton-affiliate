const { affiliateConfig } = require('../../../config')
const referralsService = require('../../referrals.service')
const { eosUtil } = require('../../../utils')

module.exports = {
  type: `${affiliateConfig.account}:payref`,
  apply: async action => {
    try {
      const traces = await eosUtil.getTransactionTraces(action.transaction_id)
      const payments = traces
        .filter(
          trace =>
            trace.act.name === 'transfer' &&
            trace.receipt.receiver === affiliateConfig.account
        )
        .map(payment => payment.act.data)

      await referralsService.addHistory({
        invitee: action.data.invitee,
        block_num: action.block,
        block_time: action.timestamp,
        contract: action.contract,
        action: action.action,
        actors: action.actors,
        trxid: action.transaction_id,
        payload: { ...action.data, payments }
      })
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
