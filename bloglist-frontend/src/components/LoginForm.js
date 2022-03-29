import React from 'react'
import './form.css'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, handleUsername, password, handlePassword }) => {
  return (
    <div className='loginForm-container'>
      <h1>Log in to the application:</h1>
      <div className='loginForm-body'>
        <form onSubmit={handleLogin}>
          <div>
              username <input
              type="text"
              value={username}
              name="Username"
              onChange={handleUsername}
            />
          </div>
          <div>
              password <input
              type="password"
              value={password}
              name="Password"
              onChange={handlePassword}
            />
          </div>
          <button className='login-btn' type="submit">login</button>
        </form>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm