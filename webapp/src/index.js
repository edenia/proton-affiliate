import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/client'

import App from './App'
import { client } from './graphql'
import * as serviceWorker from './serviceWorker'
import { SharedStateProvider } from './context/state.context'

render(
  <SharedStateProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </SharedStateProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
