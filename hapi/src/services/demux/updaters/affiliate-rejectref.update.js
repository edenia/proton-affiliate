const { affiliateConfig } = require('../../../config')
const referralsService = require('../../referrals.service')

module.exports = {
  actionType: `${affiliateConfig.account}::rejectref`,
  apply: referralsService.statuslogUpdater
}
