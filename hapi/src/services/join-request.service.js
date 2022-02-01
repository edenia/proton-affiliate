const moment = require('moment')

const { affiliateConfig } = require('../config')
const { mailTemplate } = require('../utils/templates')
const { hasuraUtil, eosUtil, mailUtil } = require('../utils')
const affiliateService = require('./affiliate.service')

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

const removeJoinRequest = async accounts => {
  const mutation = `
    mutation ($accounts: [String!]) {
      delete_join_request(where: { account: { _in: $accounts } }) {
        affected_rows
      }
    }
  `
  const data = await hasuraUtil.instance.request(mutation, { accounts })

  return data.delete_join_request
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

const findByState = async state => {
  const query = `
    query ($state: String!) {
      join_request(where: {state: {_eq: $state}}) {
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
  const { join_request } = await hasuraUtil.instance.request(query, { state })

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
    const hasKYC = await affiliateService.checkKyc(requester.account)

    if (!hasKYC) continue

    await update(requester.account, {
      status: JOIN_REQUEST_STATUS_IDS.PENDING_APPROVEMENT
    })
  }
}

const updateRequester = async () => {
  const { rows } = await eosUtil.getTableRows({
    code: affiliateConfig.account,
    scope: affiliateConfig.account,
    table: 'params'
  })
  const removeAfterDays = rows[0].expiration_days
  const requesters = await findByState('pending')

  for (const requester of requesters) {
    const daysAfterJoin = moment().diff(moment(requester.created_at), 'days')
    const hasKYC = await affiliateService.checkKyc(requester.account)

    if (!daysAfterJoin || hasKYC) continue

    if (
      daysAfterJoin === Math.round(removeAfterDays * 0.2) &&
      requester.receive_news
    ) {
      mailUtil.send({
        account: requester.account,
        to: requester.email,
        subject:
          'Further action is required to activate your Proton Affiliate account',
        template: mailTemplate.generateWarningByKYC
      })
    } else if (daysAfterJoin >= removeAfterDays) {
      mailUtil.send({
        account: requester.account,
        to: requester.email,
        subject:
          'Further action is required to activate your Proton Affiliate account',
        template: mailTemplate.generateRejectionByKYC
      })

      removeJoinRequest([requester.account])
    }
  }
}

const kycWorker = () => {
  return {
    name: 'UPDATE KYC',
    interval: affiliateConfig.updateKycInterval,
    action: updateKYC
  }
}

const removeWorker = () => {
  return {
    name: 'UPDATE REQUESTER',
    interval: affiliateConfig.updateRequesterInterval,
    action: updateRequester
  }
}

module.exports = {
  addJoinRequest,
  removeJoinRequest,
  findByAccount,
  kycWorker,
  removeWorker
}
