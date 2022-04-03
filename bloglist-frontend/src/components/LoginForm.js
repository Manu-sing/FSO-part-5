import React from 'react'
import './form.css'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, handleUsername, password, handlePassword }) => {
  return (
    <div className='loginForm-container'>
      <h1>Login to the application:</h1>
      <div className='loginForm-body'>
        <form onSubmit={handleLogin}>
          <div>
              USERNAME <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={handleUsername}
            />
          </div>
          <div>
              PASSWORD <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={handlePassword}
            />
          </div>
          <button id='login-button' className='login-btn' type="submit">login</button>
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