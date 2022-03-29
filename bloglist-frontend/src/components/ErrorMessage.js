import React from 'react'
import './errorMessage.css'

const ErrorMessage = ({ errorMessage }) => {
  const label = errorMessage === '' ?
    null :
    errorMessage

  return (
    <div className='error-message'>{label}</div>
  )
}

export default ErrorMessage