const Joi = require('joi')
const Boom = require('@hapi/boom')

const { joinRequestService, affiliateService } = require('../services')
const { mailUtil } = require('../utils')
const { mailTemplate } = require('../utils/templates')

module.exports = {
  method: 'POST',
  path: '/reject-join-request',
  handler: async ({ payload: { input } }) => {
    try {
      for (const account of input.accounts) {
        const joinRequest = await joinRequestService.findByAccount(account)
        const hasKYC = await affiliateService.checkKyc(input.account)

        if (hasKYC) continue

        try {
          mailUtil.send({
            account: account,
            to: joinRequest.email,
            subject:
              'Further action is required to activate your Proton Affiliate account',
            template: mailTemplate.generateRejectionByKYC
          })
        } catch (err) {
          console.log(err)
        }
      }

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
