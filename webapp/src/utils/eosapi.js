import EosApi from 'eosjs-api'

import { sdkConfig } from '../config'

export const eosApi = EosApi({
  httpEndpoint: sdkConfig.endpoint,
  verbose: false,
  fetchConfiguration: {}
})
