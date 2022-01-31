const { joinRequestService } = require('../services')

module.exports = {
  method: 'POST',
  path: '/test',
  handler: async () => {
    joinRequestService.removeWorker()
    return {}
  }
}
