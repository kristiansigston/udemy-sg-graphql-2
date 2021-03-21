import React, { Component } from 'react'

class AuthForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    console.log('this.props.errors', this.props.errors)
    return (
      <div className="row">
        <form onSubmit={this.onSubmit.bind(this)} className="col s4">
          <div className="input-field">
            <label>Email</label>
            <input
              placeholder="Email"
              type="text"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>

          <div className="input-field">
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>

          <div className="errors">
            {this.props.errors.map((error) => {
              return <li key={error}>{error}</li>
            })}
          </div>

          <button className="btn">Submit</button>
        </form>
      </div>
    )
  }
}

export default AuthForm
