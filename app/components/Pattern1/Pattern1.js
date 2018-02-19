import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Pattern,
  FlowSwitch,
  HeadLine
} from '../../containers/StyledComponents'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

const style = {
  height: 200,
  width: 200,
  margin: 20,
  backgroundColor: 'rgb(0, 188, 212)',
  textAlign: 'center',
  color: 'white',
}

const Pattern1 = props => {

  return (
    <Pattern>
      <FlowSwitch>
        <HeadLine>
          Use toggle to update application context.
        </HeadLine>
        <p>
          An app may have totally different behaviours when it's executed under different contexts.
          i.e It might have a creation flow for schedule configuration and an edition flow for schedule updates.
        </p>
        <div style={{textAlign: 'center'}}>{`${props.label} FLOW`}</div>
        <Toggle
          style={{width: 'unset', margin: 'auto'}}
          onClick={() => props.dispatch({
            type: 'CHANGE_APP_CONTEXT',
            payload: {context: props.isCreation ? 'EDITION' : 'CREATION'},
          })}
          toggled={props.isCreation}
        />
      </FlowSwitch>
      <RaisedButton onClick={props.interaction} label="Interaction" primary={true}/>
      {
        props.handledOn !== '' &&
        <Paper style={style} zDepth={1}>
          {props.handledOn === 'CREATION' ? 'Handled with creation flow sagas' : 'Handled with edition flow sagas'}
        </Paper>
      }
    </Pattern>)
}

Pattern1.propTypes = {
  handledOn: PropTypes.string,
  interaction: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isCreation: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Pattern1
