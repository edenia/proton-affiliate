const moment = require('moment')

const { affiliateConfig } = require('../config')
const { mailTemplate } = require('../utils/templates')
const { hasuraUtil, eosUtil, mailUtil } = require('../utils')
const affiliateService = require('./affiliate.service')

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

const updateRequester = async () => {
  const { rows } = await eosUtil.getTableRows({
    code: affiliateConfig.account,
    scope: affiliateConfig.account,
    table: 'params'
  })
  const removeAfterDays = rows[0].expiration_days
  const requesters = await findByState()

  for (const requester of requesters) {
    console.log('Requestor', requester)
    const daysAfterJoin = moment().diff(moment(requester.created_at), 'days')
    const hasKYC = await affiliateService.checkKyc(requester.account)

    console.log(`DAYS-AFTER-JOIN ${daysAfterJoin}`)
    console.log(`REMOVE-AFTER-DAYS ${removeAfterDays}`)

    if (!daysAfterJoin || hasKYC) continue

    console.log('---AFTER SAFE GUARD---')

    if (daysAfterJoin === Math.round(removeAfterDays * 0.2)) {
      mailUtil.send({
        account: requester.account,
        to: requester.email,
        subject:
          'Further action is required to activate your Proton Affiliate account',
        template: mailTemplate.generateWarningByKYC
      })
    } else if (daysAfterJoin >= removeAfterDays) {
      console.log('CAME HERE')
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
  removeWorker
}
