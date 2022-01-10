export const appVersion =
  process.env.REACT_APP_VERSION.split('/').pop() || 'v1.0'
export const name = process.env.REACT_APP_NAME
export const title = process.env.REACT_APP_TITLE
export const blockExplorer = process.env.REACT_APP_BLOCK_EXPLORER_URL
export const affiliateAccount =
  process.env.REACT_APP_AFFILIATE_ACCOUNT || 'earnproton'
export const eosioProtonAccount = 'eosio.proton'
export const logo = process.env.REACT_APP_CHAIN_LOGO
export const isTestnet = process.env.REACT_APP_USE_TESTNET === 'true'
export const footerLinks = JSON.parse(
  process.env.REACT_APP_FOOTER_LINKS || '[]'
)
