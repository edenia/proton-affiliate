const { hasuraUtil } = require('../utils')

const save = async payload => {
  const mutation = `
    mutation ($payload: referral_insert_input!) {
      insert_referral_one(object: $payload, on_conflict: {constraint: referral_invitee_key, update_columns: [status, expires_on]}) {
        id
      }
    }
  `
  const data = await hasuraUtil.instance.request(mutation, { payload })

  return data.insert_referral_one
}

const update = async (invitee, payload) => {
  const mutation = `
    mutation ($invitee: String!, $payload: referral_set_input) {
      update_referral(where: {invitee: {_eq: $invitee}}, _set: $payload) {
        affected_rows
      }
    }
  `

  await hasuraUtil.instance.request(mutation, { invitee, payload })
}

const addHistory = async payload => {
  const mutation = `
    mutation ($payload: referral_history_insert_input!) {
      insert_referral_history_one(object: $payload, on_conflict: {constraint: referral_history_invitee_contract_action_block_num_trxid_key, update_columns: [block_time, actors, payload]}) {
        id
      }
    }  
  `
  const data = await hasuraUtil.instance.request(mutation, { payload })

  return data.insert_referral_one
}

const findByInvitee = async invitee => {
  const query = `
    query ($invitee: String!) {
      referral(where: {invitee: {_eq: $invitee}}) {
        id
        invitee
        referrer
        status
        expires_on
        created_at
        updated_at
      }
    }
  `
  const data = await hasuraUtil.instance.request(query, { invitee })

  return data.referral.length > 0 ? data.referral[0] : null
}

module.exports = {
  save,
  update,
  addHistory,
  findByInvitee
}
