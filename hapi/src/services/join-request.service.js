const { affiliateConfig } = require('../config')
const { hasuraUtil, eosUtil } = require('../utils')
const { checkKyc } = require('./affiliate.service')

const JOIN_REQUEST_STATUS_IDS = {
  PENDING_KYC: 1,
  PENDING_APPROVEMENT: 2,
  APPROVED: 3
}

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

const findByStatus = async status => {
  const query = `
    query ($status: Int!) {
      join_request(where: {status: {_eq: $status}}) {
        id
        account
        status
        email
        receive_news
        created_at
        updated_at
      }
    }
  `
  const { join_request } = await hasuraUtil.instance.request(query, { status })

  return join_request.length ? join_request : null
}

const update = async (account, payload) => {
  const mutation = `
    mutation ($account: String!, $payload: join_request_set_input) {
      update_join_request(where: {account: {_eq: $account}}, _set: $payload) {
        affected_rows
      }
    }
  `

  await hasuraUtil.instance.request(mutation, { account, payload })
}

// This function is intended to make a soft database update to replace state value for status
// WARNING: Removed after a production version of this function
const updateStatus = async () => {
  const requesters = await findByStatus(JOIN_REQUEST_STATUS_IDS.PENDING_KYC)

  const { rows } = await eosUtil.getTableRows({
    code: affiliateConfig.account,
    scope: affiliateConfig.account,
    table: 'users'
  })

  for (const requester of requesters) {
    const isUser = rows.some(({ user }) => user === requester.account)

    if (!isUser) continue

    await update(requester.account, {
      status: JOIN_REQUEST_STATUS_IDS.APPROVED
    })
  }
}

const updateKYC = async () => {
  await updateStatus()

  const requesters = await findByStatus(JOIN_REQUEST_STATUS_IDS.PENDING_KYC)

  for (const requester of requesters) {
    const hasKYC = await checkKyc(requester.account)

    if (!hasKYC) continue

    await update(requester.account, {
      status: JOIN_REQUEST_STATUS_IDS.PENDING_APPROVEMENT
    })
  }
}

const kycWorker = () => {
  return {
    name: 'UPDATE KYC',
    interval: affiliateConfig.updateKycInterval,
    action: updateKYC
  }
}

module.exports = {
  addJoinRequest,
  findByAccount,
  kycWorker
}
