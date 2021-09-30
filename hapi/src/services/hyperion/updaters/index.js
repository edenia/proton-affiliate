const affiliateAddrefUpdater = require('./affiliate-addref.updater')
const affiliateAddreflogUpdater = require('./affiliate-addreflog.updater')
const affiliatePayrefUpdater = require('./affiliate-payref.updater')
const affiliateRejectrefUpdater = require('./affiliate-rejectref.update')
const affiliateStatuslogUpdater = require('./affiliate-statuslog.updater')
const affiliateVerifyaccUpdater = require('./affiliate-verifyacc.updater')
const affiliateVerifyexpUpdater = require('./affiliate-verifyexp.updater')
const affiliateVerifykycUpdater = require('./affiliate-verifykyc.updater')
const eosioNewAccountUpdaters = require('./eosio-newaccount.updater')
const eosioprotonAddkycUpdater = require('./eosioproton-addkyc.updater')

module.exports = [
  affiliateAddrefUpdater,
  affiliateAddreflogUpdater,
  affiliatePayrefUpdater,
  affiliateRejectrefUpdater,
  affiliateStatuslogUpdater,
  affiliateVerifyaccUpdater,
  affiliateVerifyexpUpdater,
  affiliateVerifykycUpdater,
  eosioNewAccountUpdaters,
  eosioprotonAddkycUpdater
]
