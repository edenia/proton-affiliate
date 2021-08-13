import React from 'react'
import { useApolloClient } from '@apollo/client'

export const useImperativeQuery = query => {
  const client = useApolloClient()

  return React.useCallback(
    variables =>
      client.query({
        query: query,
        variables: variables,
        fetchPolicy: 'network-only'
      }),
    [client]
  )
}
