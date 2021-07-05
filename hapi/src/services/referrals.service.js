const { hasuraUtil, eosUtil } = require('../utils')

const save = async payload => {
  const mutation = `
    mutation ($payload: referral_insert_input!) {
      insert_referral_one(object: $payload, on_conflict: {constraint: referral_invitee_key, update_columns: [invitee]}) {
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
      insert_referral_history_one(object: $payload) {
        id
      }
    }
  `
  const data = await hasuraUtil.instance.request(mutation, { payload })

  return data.insert_referral_one
}

const addreflogUpdater = async (state, payload) => {
  try {
    const traces = await eosUtil.getTransactionTraces(payload.transactionId)
    const addref = traces.find(trace => trace.act.name === payload.name)

    if (!addref) {
      return
    }

    await addHistory({
      action: payload.name,
      invitee: payload.data.invitee,
      block_num: addref.block_num,
      block_time: addref.block_time,
      trxid: payload.transactionId,
      payload: addref.act.data
    })

    const addreflog = traces.find(trace => trace.act.name === 'addreflog')

    if (!addreflog) {
      return
    }

    await save(addreflog.act.data)
  } catch (error) {
    console.error(`error to sync ${payload.name}: ${error.message}`)
  }
}

const statuslogUpdater = async (state, payload) => {
  try {
    const traces = await eosUtil.getTransactionTraces(payload.transactionId)
    const changelog = traces.find(trace => trace.act.name === payload.name)

    if (!changelog) {
      return
    }

    const statuslog = traces.filter(trace => trace.act.name === 'statuslog')

    for (let index = 0; index < statuslog.length; index++) {
      const action = statuslog[index]
      await addHistory({
        action: payload.name,
        invitee: action.act.data.invitee,
        block_num: changelog.block_num,
        block_time: changelog.block_time,
        trxid: payload.transactionId,
        payload: changelog.act.data
      })
      await update(action.act.data.invitee, action.act.data)
    }
  } catch (error) {
    console.error(`error to sync ${payload.name}: ${error.message}`)
  }
}

module.exports = {
  save,
  update,
  addHistory,
  addreflogUpdater,
  statuslogUpdater
}
