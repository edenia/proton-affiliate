/**
 * @file Unit test for proton affiliate program {@link https://github.com/eoscostarica/proton-affiliate}.
 * @author EOSCostaRica <https://info@eoscostarica.io>
 * @version 1.1.0
 */
const assert = require('assert')

const utils = require('./utils')

const AFFILIATE_WASM_PATH = './affiliate/affiliate.wasm'
const AFFILIATE_ABI_PATH = './affiliate/affiliate.abi'
const STATUS = {
  PENDING_USER_REGISTRATION: 1,
  PENDING_KYC_VERIFICATION: 2,
  PENDING_PAYMENT: 3,
  PAYMENT_REJECTED: 4,
  EXPIRED: 5,
  PAID: 6
}

let eoslime
let eosioAccount
let eosioProtonAccount
let eosioProtonContract
let adminProtonAccount
let affiliateAccount
let affiliateContract

let adminAccount
let referrerAccount
let invitee
let inviteeAccount

describe('affiliate contract', function () {
  this.timeout(15000)

  const eosioproton = async () => {
    adminProtonAccount = eoslime.Account.load(
      'admin.proton',
      process.env.TESTNET_EOSIO_PRIVATE_KEY,
      'verifiers'
    )
    eosioProtonAccount = eoslime.Account.load(
      'eosio.proton',
      process.env.TESTNET_EOSIO_PRIVATE_KEY
    )
    eosioProtonContract = await eoslime.Contract.fromAccount(eosioProtonAccount)
  }

  const affiliate = async () => {
    affiliateAccount = await eoslime.Account.create(
      'affiliate',
      '5KTyo8N3ncdpD3bDiTmvoU9VdRmRZE3RKi7iW4sjkftx4h2sd2B',
      eosioAccount
    )
    affiliateContract = await eoslime.Contract.deployOnAccount(
      AFFILIATE_WASM_PATH,
      AFFILIATE_ABI_PATH,
      affiliateAccount,
      { inline: true }
    )
    await affiliateAccount.addAuthority('payout')
    await affiliateAccount.setAuthorityAbilities('payout', [
      {
        action: 'transfer',
        contract: 'eosio.token'
      }
    ])
    await affiliateAccount.addAuthority('setrate')
    await affiliateAccount.setAuthorityAbilities('setrate', [
      {
        action: 'setrate',
        contract: 'affiliate'
      }
    ])
    await affiliateAccount.addAuthority('verify')
    await affiliateAccount.setAuthorityAbilities('verify', [
      {
        action: 'verifyacc',
        contract: 'affiliate'
      },
      {
        action: 'verifykyc',
        contract: 'affiliate'
      }
    ])

    const payoutAccount = eoslime.Account.load(
      'affiliate',
      affiliateAccount.privateKey,
      'payout'
    )
    await payoutAccount.addPermission('eosio.code')

    const eosioTokenAccount = eoslime.Account.load(
      'eosio.token',
      process.env.TESTNET_EOSIO_PRIVATE_KEY
    )
    const eosioTokenContract = await eoslime.Contract.fromAccount(
      eosioTokenAccount
    )
    await eosioTokenContract.actions.transfer.broadcast(
      [
        eosioAccount.name,
        affiliateAccount.name,
        '1000.0000 XPR',
        'affiliate monthly budget'
      ],
      eosioAccount
    )
  }

  before(async () => {
    eoslime = utils.eoslimeInit()
    eosioAccount = eoslime.Account.load(
      process.env.TESTNET_EOSIO_ACCOUNT,
      process.env.TESTNET_EOSIO_PRIVATE_KEY
    )
    await eosioproton()
    await affiliate()
  })

  it('Should run setparams', async () => {
    const response = await affiliateContract.actions.setparams.broadcast([
      affiliateAccount.name,
      5,
      3
    ])
    const rows = await affiliateContract.tables.params.limit(1).find()

    assert.strictEqual(rows[0].payer, affiliateAccount.name)
    console.log(`done setparams txid ${response.transaction_id}`)
  })

  it('Should run addadmin', async () => {
    adminAccount = await eoslime.Account.createRandom(eosioAccount)
    await eosioProtonContract.actions.userverify.broadcast(
      [adminAccount.name, adminAccount.name, true],
      [adminAccount, adminProtonAccount]
    )
    const response = await affiliateContract.actions.addadmin.broadcast([
      adminAccount.name
    ])
    const rows = await affiliateContract.tables.users
      .equal(adminAccount.name)
      .find()

    assert.strictEqual(rows[0].user, adminAccount.name)
    console.log(`done addadmin txid ${response.transaction_id}`)
  })

  it('Should adduser', async () => {
    referrerAccount = await eoslime.Account.createRandom(eosioAccount)
    await eosioProtonContract.actions.userverify.broadcast(
      [referrerAccount.name, referrerAccount.name, true],
      [referrerAccount, adminProtonAccount]
    )
    const response = await affiliateContract.actions.adduser.broadcast(
      [adminAccount.name, referrerAccount.name, 2],
      adminAccount
    )
    const rows = await affiliateContract.tables.users
      .equal(referrerAccount.name)
      .find()

    assert.strictEqual(rows[0].user, referrerAccount.name)
    console.log(`done adduser txid ${response.transaction_id}`)
  })

  it('Should addref', async () => {
    invitee = await eoslime.utils.randomName()
    const response = await affiliateContract.actions.addref.broadcast([
      referrerAccount.name,
      invitee
    ])
    const rows = await affiliateContract.tables.referrals.equal(invitee).find()

    assert.strictEqual(rows[0].status, STATUS.PENDING_USER_REGISTRATION)
    console.log(`done addref txid ${response.transaction_id}`)
  })

  it('Should verifyacc', async () => {
    inviteeAccount = await eoslime.Account.createFromName(invitee, eosioAccount)
    const response = await affiliateContract.actions.verifyacc.broadcast([
      inviteeAccount.name
    ])
    const rows = await affiliateContract.tables.referrals
      .equal(inviteeAccount.name)
      .find()

    assert.strictEqual(rows[0].status, STATUS.PENDING_KYC_VERIFICATION)
    console.log(`done verifyacc txid ${response.transaction_id}`)
  })

  it('Should verifykyc', async () => {
    await eosioProtonContract.actions.userverify.broadcast(
      [inviteeAccount.name, inviteeAccount.name, true],
      [inviteeAccount, adminProtonAccount]
    )
    const response = await affiliateContract.actions.verifykyc.broadcast([
      inviteeAccount.name
    ])
    const rows = await affiliateContract.tables.referrals
      .equal(inviteeAccount.name)
      .find()

    assert.strictEqual(rows[0].status, STATUS.PENDING_PAYMENT)
    console.log(`done verifykyc txid ${response.transaction_id}`)
  })

  it('Should payref', async () => {
    const response = await affiliateContract.actions.payref.broadcast(
      [adminAccount.name, inviteeAccount.name],
      adminAccount
    )
    const rows = await affiliateContract.tables.referrals
      .equal(inviteeAccount.name)
      .find()

    assert.strictEqual(rows[0].status, STATUS.PAID)
    console.log(`done payref txid ${response.transaction_id}`)
  })

  it('Should rejectref', async () => {
    const invitee2 = await eoslime.utils.randomName()
    await affiliateContract.actions.addref.broadcast([
      referrerAccount.name,
      invitee2
    ])
    const invitee2Account = await eoslime.Account.createFromName(
      invitee2,
      eosioAccount
    )
    await affiliateContract.actions.verifyacc.broadcast([invitee2Account.name])
    await eosioProtonContract.actions.userverify.broadcast(
      [invitee2Account.name, invitee2Account.name, true],
      [invitee2Account, adminProtonAccount]
    )
    await affiliateContract.actions.verifykyc.broadcast([invitee2Account.name])

    const response = await affiliateContract.actions.rejectref.broadcast(
      [
        adminAccount.name,
        invitee2Account.name,
        'referral completed too fast, could be a bot'
      ],
      adminAccount
    )
    const rows = await affiliateContract.tables.referrals
      .equal(invitee2Account.name)
      .find()

    assert.strictEqual(rows[0].status, STATUS.PAYMENT_REJECTED)
    console.log(`done rejectref txid ${response.transaction_id}`)
  })
})
