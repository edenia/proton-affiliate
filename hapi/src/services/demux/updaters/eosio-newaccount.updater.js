const { eosUtil } = require('../../../utils')

module.exports = {
  actionType: 'eosio::newaccount',
  apply: async (state, payload) => {
    // @todo: get contract name from env variable
    const { rows } = await eosUtil.getTableRows({
      code: 'affiliate',
      scope: 'affiliate',
      table: 'referrals',
      json: true,
      lower_bound: payload.data.name,
      upper_bound: payload.data.name
    })

    if (!rows.length) {
      console.log(`none referal found for ${payload.data.name}`)
      return
    }

    // @todo: execute affiliate action to change status code
    const referral = rows[0]
    console.log(referral)
  }
}
