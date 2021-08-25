export const endpoint = `${process.env.REACT_APP_UAL_API_PROTOCOL}://${
  process.env.REACT_APP_UAL_API_HOST
}${process.env.REACT_APP_UAL_API_PORT ? ':' : ''}${
  process.env.REACT_APP_UAL_API_PORT
}`
export const appName = process.env.REACT_APP_UAL_APP_NAME || 'app'
export const appLogo = process.env.REACT_APP_CHAIN_LOGO
export const network = {
  chainId: process.env.REACT_APP_UAL_CHAIN_ID,
  rpcEndpoints: [
    {
      blockchain: 'eos',
      protocol: process.env.REACT_APP_UAL_API_PROTOCOL,
      host: process.env.REACT_APP_UAL_API_HOST,
      port: parseInt(process.env.REACT_APP_UAL_API_PORT)
    }
  ]
}

export const customStyleOptions = {
  modalBackgroundColor: '#F4F7FA',
  logoBackgroundColor: '#FFFFFF',
  isLogoRound: false,
  optionBackgroundColor: '#FFFFFF',
  optionFontColor: '#000000',
  primaryFontColor: '#000000',
  secondaryFontColor: '#6B727F',
  linkColor: '#752EEB'
}
