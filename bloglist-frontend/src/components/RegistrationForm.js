import React from 'react'
import './form.css'

const RegistrationForm = ({ handleRegistration, usernameForRegistration, handleUsernameForRegistration, nameForRegistration, handleNameForRegistration, passwordForRegistration, handlePasswordForRegistration }) => {
  return (
    <div className='registrationForm-container'>
      <h1>Sign-in here:</h1>
      <div className='registrationForm-body'>
        <form onSubmit={handleRegistration}>
          <div>
              USERNAME <input
              id='usernameForRegistration'
              type="text"
              value={usernameForRegistration}
              name="usernameForRegistration"
              onChange={handleUsernameForRegistration}
            />
          </div>
          <div>
              NAME <input
              id='nameForRegistration'
              type="text"
              value={nameForRegistration}
              name="nameForRegistration"
              onChange={handleNameForRegistration}
            />
          </div>
          <div>
              PASSWORD <input
              id='passwordForRegistration'
              type="passwordForRegistration"
              value={passwordForRegistration}
              name="passwordForRegistration"
              onChange={handlePasswordForRegistration}
            />
          </div>
          <button id='registration-button' className='registration-btn' type="submit">Sign-in</button>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm