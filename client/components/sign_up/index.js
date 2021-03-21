import React, { Component } from 'react'
import AuthForm from '../auth_form'
import mutation from '../../mutations/sign_up'
import { graphql } from 'react-apollo'
import query from '../../queries/current_user'
import { hashHistory } from 'react-router'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = { errors: [] }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.data.user && this.props.data.user) {
      hashHistory.push('/dashboard')
    }
  }

  onSubmit({ email, password }) {
    this.setState({ errors: [] })
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }],
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message)
        this.setState({ errors })
      })
  }

  render() {
    console.log('this.props sdsdsa', this.props)
    return (
      <div>
        <h3>Sign up</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    )
  }
}

export default graphql(query)(graphql(mutation)(SignUpForm))
