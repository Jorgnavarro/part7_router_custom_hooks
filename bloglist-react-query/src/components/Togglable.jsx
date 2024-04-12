/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'



const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div id="btnCreate" style={hideWhenVisible}>
        <button className="btn btn-outline-light" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div id="cancelBtnForm" style={showWhenVisible}>
        {props.children}
        <button className="btn btn-outline-light" onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable