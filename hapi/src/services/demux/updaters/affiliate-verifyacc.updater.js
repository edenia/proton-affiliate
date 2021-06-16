const { affiliateConfig } = require('../../../config')
const referralsService = require('../../referrals.service')

module.exports = {
  actionType: `${affiliateConfig.account}::verifyacc`,
  apply: referralsService.statuslogUpdater
}
