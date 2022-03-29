import { useState } from 'react'
import PropTypes from 'prop-types'
import './togglable.css'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible} className='new-blog-btn-container'>
        <button className='new-blog-btn' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div className='close-blog-btn-container'>
          <button className='close-blog-btn' onClick={toggleVisibility}>Close</button>
        </div>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable