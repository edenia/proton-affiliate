const demuxService = require('./demux')
const affiliateService = require('./affiliate.service')
const referralsService = require('./referrals.service')
const workerService = require('./worker.service')

module.exports = {
  demuxService,
  affiliateService,
  referralsService,
  workerService
}
