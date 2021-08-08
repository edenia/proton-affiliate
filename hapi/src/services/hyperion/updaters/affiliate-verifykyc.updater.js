const { affiliateConfig } = require('../../../config')
const referralsService = require('../../referrals.service')

module.exports = {
  type: `${affiliateConfig.account}:verifykyc`,
  apply: async action => {
    try {
      await referralsService.addHistory({
        invitee: action.data.invitee,
        block_num: action.block,
        block_time: action.timestamp,
        contract: action.contract,
        action: action.action,
        actors: action.actors,
        trxid: action.transaction_id,
        payload: action.data
      })
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
