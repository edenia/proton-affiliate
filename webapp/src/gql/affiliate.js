import { gql } from '@apollo/client'

export const ADD_REFERRAL_MUTATION = gql`
  mutation ($invitee: String!, $referrer: String!) {
    add_referral(invitee: $invitee, referrer: $referrer) {
      trxid
    }
  }
`
