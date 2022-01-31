const moment = require('moment')

const { affiliateConfig } = require('../config')
const { hasuraUtil, eosUtil } = require('../utils')

const addJoinRequest = async payload => {
  const mutation = `
    mutation ($payload: join_request_insert_input!) {
      insert_join_request_one(object: $payload) {
        id
      }
    }
  `
  const data = await hasuraUtil.instance.request(mutation, { payload })

  return data.insert_join_request_one
}

const removeJoinRequest = async () => {}

const findByAccount = async account => {
  const query = `
    query ($account: String!) {
      join_request(where: {account: {_eq: $account}}) {
        id
        account
        email
        receive_news
        created_at
        updated_at
      }
    }
  `
  const data = await hasuraUtil.instance.request(query, { account })

  return data.join_request.length ? data.join_request[0] : null
}

const findByState = async () => {
  const query = `
    query {
      join_request(where: {state: {_eq: "pending"}}) {
        id
        account
        email
        state
        receive_news
        created_at
        updated_at
      }
    }
  `
  const { join_request } = await hasuraUtil.instance.request(query)

  return join_request.length ? join_request : null
}

// State: pending

const updateRequester = async () => {
  const { rows } = await eosUtil.getTableRows({
    code: affiliateConfig.account,
    scope: affiliateConfig.account,
    table: 'params'
  })

  console.log('PARAMS', rows[0].expiration_days)

  const users = await findByState()
  console.log('USERS', users)

  const seconds = moment(affiliateConfig.updateRequesterInterval, 'seconds')
  console.log('INTERVAL', affiliateConfig.updateRequesterInterval)
  console.log('SECONDS', seconds)

  // for(const user of users) {
  //   const registeredSince = moment().diff
  // }
}

const removeWorker = async () => {
  updateRequester()
  // return {
  //   name: 'REMOVER ACTIONS',
  //   interval: affiliateConfig.updateRequesterInterval,
  //   action: updateRequester
  // }
}

module.exports = {
  addJoinRequest,
  removeJoinRequest,
  findByAccount,
  removeWorker
}
