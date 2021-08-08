const { affiliateConfig } = require('../../../config')
const referralsService = require('../../referrals.service')

module.exports = {
  type: `${affiliateConfig.account}:statuslog`,
  apply: async action => {
    try {
      await referralsService.update(action.data.invitee, action.data)
    } catch (error) {
      console.error(`error to sync ${action.name}: ${error.message}`)
    }
  }
}
