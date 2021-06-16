const { affiliateConfig } = require('../../../config')
const referralsService = require('../../referrals.service')

module.exports = {
  actionType: `${affiliateConfig.account}::verifyexp`,
  apply: referralsService.statuslogUpdater
}
