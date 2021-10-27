const hyperionService = require('./hyperion')
const affiliateService = require('./affiliate.service')
const exchangeService = require('./exchange.service')
const joinRequestService = require('./join-request.service')
const referralsService = require('./referrals.service')
const workerService = require('./worker.service')

module.exports = {
  hyperionService,
  affiliateService,
  exchangeService,
  joinRequestService,
  referralsService,
  workerService
}
