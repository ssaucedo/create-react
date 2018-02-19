import React from 'react'
import PropTypes from 'prop-types'

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

const Operation = (props) => {
  return (
    <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
      <Stepper activeStep={props.step} orientation="vertical">
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
      </Stepper>
    </div>)
}

Operation.propTypes = {
  step: PropTypes.number,
}

export default Operation
