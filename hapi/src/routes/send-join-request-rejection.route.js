const Joi = require('joi')
const Boom = require('@hapi/boom')

const {
  mailUtil: { send }
} = require('../utils')
const {
  mailTemplate: { generateRejectionByKYC }
} = require('../utils/templates')
const {
  joinRequestService: { findByAccount },
  affiliateService: { checkKyc }
} = require('../services')

module.exports = {
  method: 'POST',
  path: '/send-join-request-rejection',
  handler: async ({ payload: { input } }) => {
    try {
      for (const account of input.accounts) {
        const hasKYC = await checkKyc(account)

        if (hasKYC) continue

        const { email } = await findByAccount(account)

        await send({
          account: account,
          to: email,
          subject: 'Your Proton referral link is not yet active!',
          template: generateRejectionByKYC
        })
      }

      return { success: true }
    } catch (error) {
      throw Boom.badRequest(error.message, { code: 'BAD_REQUEST' })
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        input: Joi.object({
          accounts: Joi.array().required()
        }).required()
      }).options({ stripUnknown: true })
    }
  }
}
