import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'
import LoginForm from './components/login_form'
import SignupForm from './components/sign_up'
import Dashboard from './components/dashboard'
import requireAuth from './components/require_auth'

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
})

const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
  networkInterface,
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/signup" component={SignupForm}></Route>
          <Route path="/dashboard" component={requireAuth(Dashboard)}></Route>
        </Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
