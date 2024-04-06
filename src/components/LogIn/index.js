import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LogIn = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const renderSuccessView = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const renderFailureView = errorMsg => {
    setErrorMessage(errorMsg)
  }

  const onFormSubmit = async e => {
    e.preventDefault()

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      renderSuccessView(data.jwt_token)
    } else {
      renderFailureView(data.error_msg)
      setShowError(true)
    }
  }
  const onChangeUser = e => {
    setUsername(e.target.value)
  }

  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="app-login-container">
      <form onSubmit={onFormSubmit} className="form-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <div className="username-container">
          <label className="label" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            placeholder="Username"
            onChange={onChangeUser}
            value={username}
          />
        </div>
        <div className="password-container">
          <label className="label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            placeholder="Password"
            onChange={onChangePassword}
            value={password}
          />
        </div>
        <div className="login-container">
          <button className="login" type="submit">
            Login
          </button>
          {showError && <p>*{errorMessage}</p>}
        </div>
      </form>
    </div>
  )
}

export default LogIn
