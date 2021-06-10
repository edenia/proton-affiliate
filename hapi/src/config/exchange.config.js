module.exports = {
  api: process.env.HAPI_EXCHANGE_API,
  from: process.env.HAPI_EXCHANGE_FROM,
  to: process.env.HAPI_EXCHANGE_TO,
  syncInterval: parseInt(process.env.HAPI_EXCHANGE_SYNC_INTERVAL || 86400)
}
