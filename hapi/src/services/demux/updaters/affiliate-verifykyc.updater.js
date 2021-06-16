const { affiliateConfig } = require('../../../config')
const referralsService = require('../../referrals.service')

module.exports = {
  actionType: `${affiliateConfig.account}::verifykyc`,
  apply: referralsService.statuslogUpdater
}
