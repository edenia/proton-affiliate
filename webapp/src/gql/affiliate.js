import { gql } from '@apollo/client'

export const ADD_REFERRAL_MUTATION = gql`
  mutation ($invitee: String!, $referrer: String!) {
    add_referral(invitee: $invitee, referrer: $referrer) {
      trxid
    }
  }
`

export const SEND_CONFIRMATION_MUTATION = gql`
  mutation ($accounts: [String]!) {
    send_confirmation(accounts: $accounts) {
      success
    }
  }
`

export const GET_HISTORY_BY_INVITEES = gql`
  query ($invitees: [String!]) {
    history: referral_history(
      where: { invitee: { _in: $invitees } }
      order_by: { block_time: desc }
    ) {
      invitee
      trxid
      block_num
      block_time
      action
      payload
    }
  }
`

export const GET_HISTORY_BY_REFERRERS = gql`
  query ($referrers: [String!]) {
    history: referral_history(
      where: {
        referral: { referrer: { _in: $referrers } }
        action: { _eq: "payref" }
      }
      order_by: { block_time: desc }
    ) {
      referral {
        referrer
      }
      trxid
      payload
    }
  }
`

export const GET_REWARDS_HISTORY = gql`
  query ($limit: Int = 10) {
    referral_history(
      where: { action: { _eq: "payref" } }
      limit: $limit
      order_by: { block_time: desc }
    ) {
      invitee
      action
      payload
      block_time
      trxid
      referral {
        invitee
        referrer
        history(order_by: { block_time: asc }) {
          trxid
          block_num
          block_time
          action
          payload
        }
      }
    }
  }
`

export const GET_MY_REFERRALS = gql`
  query getMyReferral(
    $where: referral_bool_exp
    $offset: Int = 0
    $limit: Int = 5
  ) {
    info: referral_aggregate(where: $where) {
      referrals: aggregate {
        count
      }
    }
    referrals: referral(where: $where, offset: $offset, limit: $limit) {
      id
      invitee
      referrer
      status
      expires_on
      created_at
      history(order_by: { block_time: asc }) {
        trxid
        block_num
        block_time
        action
        payload
      }
    }
  }
`

export const ADD_JOIN_REQUEST_MUTATION = gql`
  mutation addJoinRequest($user: join_request_insert_input!) {
    userJoin: insert_join_request_one(object: $user) {
      id
    }
  }
`

export const GET_JOIN_REQUEST = gql`
  query getJoinRequest(
    $limit: Int = 5
    $offset: Int = 0
    $where: join_request_bool_exp
  ) {
    infoJoin: join_request_aggregate {
      aggregate {
        count
      }
    }
    joinRequest: join_request(
      where: $where
      offset: $offset
      limit: $limit
      order_by: { created_at: desc }
    ) {
      account
      email
      id
      receive_news
      created_at
    }
  }
`

export const DELETE_JOIN_REQUEST_MUTATION = gql`
  mutation deleteJoin($ids: [uuid!]) {
    delete_join_request(where: { id: { _in: $ids } }) {
      affected_rows
    }
  }
`
export const GET_REFERRAL_BY_INVITEE = gql`
  query ($invitee: String!) {
    referrals: referral(where: { invitee: { _eq: $invitee } }, limit: 1) {
      id
      invitee
      referrer
      status
      expires_on
      history(order_by: { block_time: asc }) {
        trxid
        block_num
        block_time
        action
        payload
      }
    }
  }
`

export const GET_LAST_SYNCED = gql`
  query {
    hyperion_state(limit: 1) {
      last_synced_at
    }
  }
`
