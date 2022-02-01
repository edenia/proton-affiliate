const Joi = require('joi')
const Boom = require('@hapi/boom')

const { joinRequestService } = require('../services')

module.exports = {
  method: 'POST',
  path: '/test',
  handler: async () => {
    try {
      joinRequestService.kycWorker()

      return {}
    } catch (error) {
      throw Boom.badRequest(error.message, { code: 'BAD_REQUEST' })
    }
  }
}
