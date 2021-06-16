const affiliateAddrefUpdater = require('./affiliate-addref.updater')
const affiliatePayrefUpdater = require('./affiliate-payref.updater')
const affiliateRejectrefUpdater = require('./affiliate-rejectref.update')
const affiliateVerifyaccUpdater = require('./affiliate-verifyacc.updater')
const affiliateVerifyexpUpdater = require('./affiliate-verifyexp.updater')
const affiliateVerifykycUpdater = require('./affiliate-verifykyc.updater')
const eosioNewAccountUpdaters = require('./eosio-newaccount.updater')
const eosioprotonUserverifyUpdater = require('./eosioproton-userverify.updater')

module.exports = [
  affiliateAddrefUpdater,
  affiliatePayrefUpdater,
  affiliateRejectrefUpdater,
  affiliateVerifyaccUpdater,
  affiliateVerifyexpUpdater,
  affiliateVerifykycUpdater,
  eosioNewAccountUpdaters,
  eosioprotonUserverifyUpdater
]
