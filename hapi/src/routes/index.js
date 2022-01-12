const addJoinRequest = require('./add-join-request.route')
const addReferralRoute = require('./add-referral.route')
const sendConfirmationRoute = require('./send-confirmation.route')
const healthzRoute = require('./healthz.route')

module.exports = [
  addJoinRequest,
  addReferralRoute,
  sendConfirmationRoute,
  healthzRoute
]
