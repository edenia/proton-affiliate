const { Api, JsonRpc } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')
const fetch = require('node-fetch')
const { TextEncoder, TextDecoder } = require('util')
const eosECC = require('eos-ecc')
const Contract = require('eoslime/src/contract/contract')
const eoslime = require('eoslime').init({
  url: process.env.TESTNET_NETWORK_API,
  chainId: process.env.TESTNET_NETWORK_CHAIN_ID
})

const transact = async (trx, privateKeys) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  const signatureProvider = new JsSignatureProvider(privateKeys)
  const rpc = new JsonRpc(process.env.TESTNET_NETWORK_API, { fetch })
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

const getAbi = async account => {
  await new Promise(resolve => setTimeout(resolve, 500))
  const signatureProvider = new JsSignatureProvider([])
  const rpc = new JsonRpc(process.env.TESTNET_NETWORK_API, { fetch })
  const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
  })

  return api.getAbi(account)
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

  let authorization

  if (Array.isArray(authorizer)) {
    authorization = authorizer.map(auth => auth.authority)
  } else {
    authorization = [authorizer.authority]
  }

  return {
    actions: [
      {
        authorization,
        account: action.contract.name,
        name: action.functionName,
        data: structureParams
      }
    ]
  }
}

const broadcast = action => (params, authorizer) => {
  let rawTx

  if (Array.isArray(authorizer)) {
    rawTx = buildFunctionRawTxData(action, params, authorizer)

    return transact(
      rawTx,
      authorizer.map(auth => auth.privateKey)
    )
  }

  rawTx = buildFunctionRawTxData(
    action,
    params,
    authorizer || action.contract.executor
  )

  return transact(rawTx, [(authorizer || action.contract.executor).privateKey])
}

const contractWrapper = contract => {
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

const deployOnAccount = async (wasmPath, abiPath, account, options = {}) => {
  const contract = await eoslime.Contract.deployOnAccount(
    wasmPath,
    abiPath,
    account,
    options
  )

  return contractWrapper(contract)
}

const fromAccount = async account => {
  const abi = await getAbi(account.name)
  const contract = new Contract(eoslime.Provider, abi, account.name, account)

  return contractWrapper(contract)
}

const createAccountOnBlockchain = async (
  accountToBeCreated,
  accountCreator
) => {
  return transact(
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
        },
        {
          authorization: [accountCreator.authority],
          account: 'eosio',
          name: 'buyrambytes',
          data: {
            payer: accountCreator.name,
            receiver: accountToBeCreated.name,
            bytes: '2048000'
          }
        },
        {
          authorization: [accountCreator.authority],
          account: 'eosio',
          name: 'delegatebw',
          data: {
            from: accountCreator.name,
            receiver: accountToBeCreated.name,
            stake_net_quantity: '1.0000 XPR',
            stake_cpu_quantity: '1.0000 XPR',
            transfer: true
          }
        }
      ]
    },
    [accountCreator.privateKey]
  )
}

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

const createFromName = async (name, accountCreator) => {
  const privateKey = await eoslime.utils.randomPrivateKey()

  const newAccount = {
    name,
    privateKey,
    publicKey: await eosECC.public_key_from_private(privateKey)
  }

  await createAccountOnBlockchain(newAccount, accountCreator)

  return eoslime.Account.load(newAccount.name, newAccount.privateKey)
}

const create = async (name, privateKey, accountCreator) => {
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
    deployOnAccount,
    fromAccount
  },
  Account: {
    ...eoslime.Account,
    createRandom,
    createFromName,
    create,
    load: (...args) => eoslime.Account.load(...args)
  }
})

module.exports = {
  eoslimeInit
}
