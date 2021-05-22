module.exports = {
  method: 'GET',
  path: '/healthz',
  handler: () => {
    return 'OK'
  }
}
