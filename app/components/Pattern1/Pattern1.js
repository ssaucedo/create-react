import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Pattern,
  FlowSwitch,
} from '../../containers/StyledComponents'
import Toggle from 'material-ui/Toggle'
import ConnectedElement from './ConnectedElement'

const Pattern1 = props => (
  <Pattern>
    <FlowSwitch>
      <p>Use the toggle to update application context.</p>
      <p> The app has a different set of sagas for each one.</p>
      <div>{`${props.label}`}</div>
      <Toggle
        onClick={() => props.dispatch({
          type: 'CHANGE_APP_CONTEXT',
          payload: {context: props.isCreation ? 'EDITION' : 'CREATION'},
        })}
        toggled={props.isCreation}
      />
    </FlowSwitch>
    <ConnectedElement dispatch={props.dispatch}/>
  </Pattern>
)

Pattern1.propTypes = {
  label: PropTypes.string.isRequired,
  isCreation: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Pattern1
