const { affiliateConfig } = require('../../../config')
const referralsService = require('../../referrals.service')
const { eosUtil } = require('../../../utils')

module.exports = {
  type: `${affiliateConfig.account}:verifyexp`,
  apply: async action => {
    try {
      const traces = await eosUtil.getTransactionTraces(action.transaction_id)
      const logs = traces.filter(trace => trace.act.name === 'statuslog')

      for (let index = 0; index < logs.length; index++) {
        const log = logs[index]

        await referralsService.addHistory({
          invitee: log.act.data.invitee,
          block_num: action.block,
          block_time: action.timestamp,
          contract: action.contract,
          action: action.action,
          actors: action.actors,
          trxid: action.transaction_id,
          payload: action.data
        })
      }
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
