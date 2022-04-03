import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import './togglable.css'

// eslint-disable-next-line react/display-name
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

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
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable