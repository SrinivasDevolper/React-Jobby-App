import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  userInput = event => {
    this.setState({username: event.target.value})
  }

  passInput = event => {
    this.setState({password: event.target.value})
  }

  usernameInput = () => {
    const {username} = this.state
    return (
      <div className="username-cont">
        <label htmlFor="userInput" className="username-label">
          Username
        </label>
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          id="userInput"
          onChange={this.userInput}
          value={username}
        />
      </div>
    )
  }

  passwordInput = () => {
    const {password} = this.state
    return (
      <div className="username-cont">
        <label htmlFor="passwordInput" className="username-label">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          id="passwordInput"
          onChange={this.passInput}
          value={password}
        />
      </div>
    )
  }

  successLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  faliureLogin = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  renderSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userData = {
      username,
      password,
    }
    console.log(userData)
    const api = 'https://apis.ccbp.in/login/'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(api, options)
    console.log(response)
    const data = await response.json()
    if (response.status === 200) {
      this.successLogin(data.jwt_token)
    } else {
      this.faliureLogin(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const cookesResponse = Cookies.get('jwt_token')
    if (cookesResponse !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-card">
          <div className="logo-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt=" website logo"
              className="login-logo"
            />
          </div>
          <form onSubmit={this.renderSubmit}>
            {this.usernameInput()}
            {this.passwordInput()}
            <button className="login-btn" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
