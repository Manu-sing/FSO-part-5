import React from 'react'

const Header = ({ text, user, handleLogout }) => {
  return (
    <>
      <div >
        <h1>{text}</h1>
      </div>
      {user === null
        ? '' :
        <div className='header-menu'>
          <div>
            <p><strong>{`'${user.name}' logged-in`}</strong></p>
          </div>
          <div>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      }
    </>
  )
}

export default Header