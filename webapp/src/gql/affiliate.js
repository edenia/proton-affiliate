import { gql } from '@apollo/client'

export const ADD_REFERRAL_MUTATION = gql`
  mutation ($invitee: String!, $referrer: String!) {
    add_referral(invitee: $invitee, referrer: $referrer) {
      trxid
    }
  }
`

export const GET_REFERRAL_QUERY = gql`
  query ($offset: Int = 0, $limit: Int = 5) {
    info: referral_aggregate {
      referrals: aggregate {
        count
      }
    }
    referrals: referral(offset: $offset, limit: $limit) {
      id
      updated_at
      invitee
      referrer
      status
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

export const GET_REFERRAL_HISTORY = gql`
  query getReferralHistory {
    referral_history {
      id
      invitee
      payload
      trxid
      created_at
      block_time
    }
  }
`
