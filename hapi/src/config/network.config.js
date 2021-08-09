module.exports = {
  api: process.env.HAPI_NETWORK_API,
  chainId: process.env.HAPI_NETWORK_CHAIN_ID,
  creatorAccount: process.env.HAPI_NETWORK_CREATOR_ACCOUNT || '',
  creatorPassword: process.env.HAPI_NETWORK_CREATOR_PASSWORD || '',
  wallet: process.env.HAPI_NETWORK_WALLET
}
