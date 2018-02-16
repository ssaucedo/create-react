import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton';


import Operation from './operation'

const Pattern2 = (props) => {
    return (
      <div>
        <div style={{display: 'flex'}}>
          {Object.values(props.operations).map((op, key) =>
            <Operation key={key} {...op} />
          )}
        </div>
        <RaisedButton onClick={props.startOperation} label="Primary" primary={true}/>
      </div>
    )
}

Pattern2.defaultProps = {
  operations: {},
}

Pattern2.propTypes = {
  startOperation: PropTypes.func.isRequired,
  operations: PropTypes.object,
}

export default Pattern2

