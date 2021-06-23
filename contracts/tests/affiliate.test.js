/**
 * @file Unit test for proton affiliate program {@link https://github.com/eoscostarica/proton-affiliate}.
 * @author EOSCostaRica <https://info@eoscostarica.io>
 * @version 1.1.0
 */
const assert = require('assert')

const utils = require('./utils')

const AFFILIATE_WASM_PATH = './affiliate/affiliate.wasm'
const AFFILIATE_ABI_PATH = './affiliate/affiliate.abi'

let eoslime
let eosioAccount
let contractAccount
let contract

let adminAccount
let referrerAccount
let invitee
let inviteeAccount

describe('affiliate contract', function () {
  this.timeout(15000 * 5)

  before(async () => {
    eoslime = utils.eoslimeInit()
    eosioAccount = eoslime.Account.load(
      process.env.LOCAL_TESTET_EOSIO_ACCOUNT,
      process.env.LOCAL_TESTET_EOSIO_PRIVATE_KEY
    )
    contractAccount = await eoslime.Account.createFromName(
      'affiliate',
      eosioAccount
    )
    contract = await eoslime.Contract.deployOnAccount(
      AFFILIATE_WASM_PATH,
      AFFILIATE_ABI_PATH,
      contractAccount,
      { inline: true }
    )
    // @todo: deploy eosio.proton to can verify kyc
  })

  it('Should run setparams', async () => {
    const response = await contract.actions.setparams.broadcast([
      contractAccount.name,
      0.05,
      5,
      3
    ])
    console.log(`done setparams txid ${response.transaction_id}`)
  })

  it('Should run addadmin', async () => {
    adminAccount = await eoslime.Account.createRandom(eosioAccount)
    const response = await contract.actions.addadmin.broadcast([
      adminAccount.name
    ])
    console.log(`done addadmin txid ${response.transaction_id}`)
  })

  it('Should adduser', async () => {
    referrerAccount = await eoslime.Account.createRandom(eosioAccount)
    const response = await contract.actions.adduser.broadcast(
      [adminAccount.name, referrerAccount.name, 2],
      adminAccount
    )
    console.log(`done adduser txid ${response.transaction_id}`)
  })

  it('Should addref', async () => {
    invitee = await eoslime.utils.randomName()
    const response = await contract.actions.addref.broadcast([
      referrerAccount.name,
      invitee
    ])
    const rows = await contract.tables.referrals.equal(invitee).find()

    console.log(`done addref txid ${response.transaction_id}`)
    assert.strictEqual(rows[0].invitee, invitee)
  })

  it('Should verifyacc', async () => {
    inviteeAccount = await eoslime.Account.createFromName(invitee, eosioAccount)
    const response = await contract.actions.verifyacc.broadcast([
      inviteeAccount.name
    ])
    console.log(`done verifyacc txid ${response.transaction_id}`)
  })

  // @todo: add test for verifykyc action
  it('Should verifykyc', async () => {})

  // @todo: add test for payref action
  it('Should payref', async () => {})
})
