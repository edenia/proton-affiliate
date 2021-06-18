const assert = require('assert')

const TOKEN_WASM_PATH = '../affiliate.wasm'
const TOKEN_ABI_PATH = '../affiliate.abi'

describe('affiliate contract', function (eoslime) {
  this.timeout(15000)

  beforeEach(async () => {
    // Deploy the contact
    tokenContract = await eoslime.Contract.deploy(
      TOKEN_WASM_PATH,
      TOKEN_ABI_PATH
    )
  })

  it('Should add a new referral', async () => {
    // @todo: we should set params before run any test
    // @todo: we should add an admin user to can add a referrer
    // @todo: we should add a referrer before can addd a refferal
    let accounts = await eoslime.Account.createRandoms(2)
    const referrer = accounts[0]
    const invitee = accounts[1]

    await tokenContract.actions.addref(referrer, invitee)
    let row = await tokenContract.tables.referrals.find(
      tokenContract.name,
      invitee
    )

    assert.strictEqual(row.affiliate, invitee, 'Incorrect invitee')
  })
})
