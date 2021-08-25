export const appVersion =
  process.env.REACT_APP_VERSION.replace('$npm_package_version', '') || 'v1.0'
export const name = process.env.REACT_APP_NAME
export const title = process.env.REACT_APP_TITLE
export const blockExplorer = process.env.REACT_APP_BLOCK_EXPLORER_URL
export const affiliateAccount = process.env.REACT_APP_AFFILIATE_ACCOUNT
export const logo = process.env.REACT_APP_CHAIN_LOGO
export const footerLinks = JSON.parse(
  process.env.REACT_APP_FOOTER_LINKS || '[]'
)
