import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const ConnectedElement = (props) => {
  return <div className="connected-element" onClick={() => props.dispatch({type: 'CONNECTED_ELEMENT_INTERACTION', payload: {}})}>
    {'Connected component'}
  </div>
}

ConnectedElement.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default ConnectedElement
