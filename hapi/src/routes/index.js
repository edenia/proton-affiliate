const addJoinRequest = require('./add-join-request.route')
const addReferralRoute = require('./add-referral.route')
const sendConfirmationRoute = require('./send-confirmation.route')
const rejectJoinRequestRoute = require('./reject-join-request.route')
const healthzRoute = require('./healthz.route')
const testRoute = require('./test.route')

module.exports = [
  addJoinRequest,
  addReferralRoute,
  sendConfirmationRoute,
  rejectJoinRequestRoute,
  healthzRoute,
  testRoute
]
