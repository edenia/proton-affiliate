const Joi = require('joi')
const Boom = require('@hapi/boom')

const {
  mailUtil: { sendConfirmation }
} = require('../utils')
const {
  joinRequestService: { findByAccount }
} = require('../services')

module.exports = {
  method: 'POST',
  path: '/send-confirmation',
  handler: async ({ payload: { input } }) => {
    try {
      for (const account of input.accounts) {
        const { email } = await findByAccount(account)
        await sendConfirmation({
          account: account,
          to: email,
          subject: 'Welcome to the proton affiliate platform! '
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
