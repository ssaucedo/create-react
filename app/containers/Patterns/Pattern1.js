import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {
  Pattern,
  FlowSwitch
} from '../../containers/StyledComponents'
import Toggle from 'material-ui/Toggle';
import ConnectedElement from '../ConnectedElement'

const Pattern1 = props => {
  return (
      <Pattern>
        <FlowSwitch>
          <div>{`${props.label}`}</div>
          <Toggle
              onClick={() => props.dispatch(
                  {
                    type: 'CHANGE_APP_CONTEXT',
                    payload: {context: props.isCreation ? 'EDITION' : 'CREATION'}
                  })}
              toggled={props.isCreation}
          />
        </FlowSwitch>
        <ConnectedElement dispatch={props.dispatch}/>
      </Pattern>
  )
}

Pattern1.propTypes = {
  label: PropTypes.string.isRequired,
  isCreation: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  return {
    label: state.context.appContext.context,
    isCreation: state.context.appContext.context === 'CREATION',
  }
}

export default connect(mapStateToProps)(Pattern1)
