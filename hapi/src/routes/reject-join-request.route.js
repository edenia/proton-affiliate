const Joi = require('joi')
const Boom = require('@hapi/boom')

const { joinRequestService, affiliateService } = require('../services')

module.exports = {
  method: 'POST',
  path: '/reject-join-request',
  handler: async ({ payload: { input } }) => {
    try {
      const transaction = await joinRequestService.removeJoinRequest(
        input.accounts
      )

      return { success: transaction.affected_rows > 0 }
    } catch (error) {
      throw Boom.badRequest(error.message, { code: 'BAD_REQUEST' })
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        input: Joi.object({
          accounts: Joi.array().items(Joi.string()).required()
        }).required()
      }).options({ stripUnknown: true })
    }
  }
}
