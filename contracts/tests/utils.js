const { Api, JsonRpc } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')
const fetch = require('node-fetch')
const { TextEncoder, TextDecoder } = require('util')
const eosECC = require('eos-ecc')
const eoslime = require('eoslime').init({
  url: process.env.LOCAL_TESTET_NETWORK_API,
  chainId: process.env.LOCAL_TESTET_NETWORK_CHAIN_ID
})

const transact = async (trx, privateKey) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  const signatureProvider = new JsSignatureProvider([privateKey])
  const rpc = new JsonRpc(process.env.LOCAL_TESTET_NETWORK_API, { fetch })
  const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
  })

  return api.transact(trx, {
    blocksBehind: 3,
    expireSeconds: 30
  })
}

const structureParamsToExpectedLook = (params, expectedParamsLook) => {
  let structuredParams = {}

  for (let i = 0; i < expectedParamsLook.length; i++) {
    let expectedParam = expectedParamsLook[i].name
    structuredParams[expectedParam] = params[i]
  }

  return structuredParams
}

const buildFunctionRawTxData = (action, params, authorizer) => {
  const structureParams = structureParamsToExpectedLook(
    params,
    action.functionFields
  )

  return {
    actions: [
      {
        account: action.contract.name,
        name: action.functionName,
        authorization: [authorizer.authority],
        data: structureParams
      }
    ]
  }
}

const broadcast = action => (params, authorizer) => {
  const rawTx = buildFunctionRawTxData(
    action,
    params,
    authorizer || action.contract.executor
  )

  return transact(rawTx, (authorizer || action.contract.executor).privateKey)
}

const deployOnAccount = async (wasmPath, abiPath, account, options = {}) => {
  const contract = await eoslime.Contract.deployOnAccount(
    wasmPath,
    abiPath,
    account,
    options
  )
  const actionNames = Object.keys(contract.actions)
  const oldActions = {
    ...contract.actions
  }
  const newActions = {}

  for (let index = 0; index < actionNames.length; index++) {
    const actionName = actionNames[index]

    newActions[actionName] = {
      broadcast: broadcast(oldActions[actionName]),
      getRawTransaction: (...args) =>
        oldActions[actionName].getRawTransaction(...args),
      sign: (...args) => oldActions[actionName].sign(...args)
    }
  }

  contract.actions = newActions

  return contract
}

const createAccountOnBlockchain = async (accountToBeCreated, accountCreator) =>
  transact(
    {
      actions: [
        {
          authorization: [accountCreator.authority],
          account: 'eosio',
          name: 'newaccount',
          data: {
            creator: accountCreator.name,
            name: accountToBeCreated.name,
            owner: {
              threshold: 1,
              keys: [
                {
                  key: accountToBeCreated.publicKey,
                  weight: 1
                }
              ],
              accounts: [],
              waits: []
            },
            active: {
              threshold: 1,
              keys: [
                {
                  key: accountToBeCreated.publicKey,
                  weight: 1
                }
              ],
              accounts: [],
              waits: []
            }
          }
        }
      ]
    },
    accountCreator.privateKey
  )

const createRandom = async accountCreator => {
  const privateKey = await eoslime.utils.randomPrivateKey()
  const name = await eoslime.utils.nameFromPrivateKey(privateKey)
  const newAccount = {
    name,
    privateKey,
    publicKey: await eosECC.public_key_from_private(privateKey)
  }

  await createAccountOnBlockchain(newAccount, accountCreator)

  return eoslime.Account.load(newAccount.name, newAccount.privateKey)
}

const eoslimeInit = () => ({
  ...eoslime,
  Contract: {
    ...eoslime.Contract,
    deployOnAccount
  },
  Account: {
    ...eoslime.Account,
    createRandom,
    load: (...args) => eoslime.Account.load(...args),
    createFromName: (...args) => eoslime.Account.createFromName(...args)
  }
})

module.exports = {
  eoslimeInit
}
