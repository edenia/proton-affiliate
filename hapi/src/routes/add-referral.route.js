const Joi = require('joi')
const Boom = require('@hapi/boom')

const { affiliateService } = require('../services')

module.exports = {
  method: 'POST',
  path: '/add-referral',
  handler: async ({ payload: { input } }) => {
    try {
      const transaction = await affiliateService.addReferral(input)

      return { trxid: transaction.transaction_id }
    } catch (error) {
      throw Boom.badRequest(error.message, { code: 'BAD_REQUEST' })
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        input: Joi.object({
          referrer: Joi.string().required(),
          invitee: Joi.string().required()
        }).required()
      }).options({ stripUnknown: true })
    }
  }
}
