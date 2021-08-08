const { affiliateConfig } = require('../../../config')
const referralsService = require('../../referrals.service')

module.exports = {
  type: `${affiliateConfig.account}:addreflog`,
  apply: async action => {
    try {
      await referralsService.save(action.data)
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
