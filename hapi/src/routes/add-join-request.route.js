const Joi = require('joi')
const Boom = require('@hapi/boom')

const { joinRequestService, affiliateService } = require('../services')
const { mailUtil } = require('../utils')
const { mailTemplate } = require('../utils/templates')

module.exports = {
  method: 'POST',
  path: '/add-join-request',
  handler: async ({ payload: { input } }) => {
    try {
      const isAnInvitee = await affiliateService.isAccountValidAsInvitee(
        input.account
      )
      const joinRequest = await joinRequestService.findByAccount(input.account)
      const hasKYC = await affiliateService.checkKyc(input.account)

      if (isAnInvitee || joinRequest?.length)
        throw Boom.badRequest('Account does not meet requirements')

      if (!hasKYC) {
        mailUtil.send({
          account: input.account,
          to: input.email,
          subject:
            'Further action is required to activate your Proton Affiliate account.',
          template: mailTemplate.generateRejectionByKYC
        })
      }

      const transaction = await joinRequestService.addJoinRequest(input)

      return { id: transaction.id }
    } catch (error) {
      throw Boom.badRequest(error.message, { code: 'BAD_REQUEST' })
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        input: Joi.object({
          account: Joi.string().required(),
          email: Joi.string().required(),
          receive_news: Joi.boolean().required()
        }).required()
      }).options({ stripUnknown: true })
    }
  }
}
