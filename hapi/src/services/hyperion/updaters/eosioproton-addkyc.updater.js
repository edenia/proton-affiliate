const affiliateService = require('../../affiliate.service')
const referralsService = require('../../referrals.service')

module.exports = {
  type: 'eosio.proton:addkyc',
  apply: async action => {
    try {
      const referral = await referralsService.findByInvitee(action.data.acc)

      if (!referral) {
        return
      }

      await referralsService.addHistory({
        invitee: action.data.acc,
        block_num: action.block,
        block_time: action.timestamp,
        contract: action.contract,
        action: action.action,
        actors: action.actors,
        trxid: action.transaction_id,
        payload: action.data
      })

      await affiliateService.verifyKYC(referral.invitee)
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
