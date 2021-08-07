import { gql } from '@apollo/client'

export const ADD_REFERRAL_MUTATION = gql`
  mutation ($invitee: String!, $referrer: String!) {
    add_referral(invitee: $invitee, referrer: $referrer) {
      trxid
    }
  }
`

export const GET_HISTORY = gql`
  query ($invitees: [String!]) {
    history: referral_history(
      where: { invitee: { _in: $invitees } }
      order_by: { block_time: asc }
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

export const GET_REFERRAL_HISTORY = gql`
  query getReferralHistory($limit: Int = 10) {
    referral_history(limit: $limit) {
      id
      invitee
      payload
      trxid
      created_at
      block_time
    }
  }
`

export const GET_MY_REFERRALS = gql`
  query getMyReferral(
    $where: referral_bool_exp
    $offset: Int = 0
    $limit: Int = 5
  ) {
    info: referral_aggregate {
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
  query getJoinRequest($limit: Int = 10) {
    join_request(limit: $limit) {
      account
      email
      id
      receive_news
    }
  }
`
