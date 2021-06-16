const { affiliateConfig } = require('../../../config')
const referralsService = require('../../referrals.service')

module.exports = {
  actionType: `${affiliateConfig.account}::payref`,
  apply: referralsService.statuslogUpdater
}
