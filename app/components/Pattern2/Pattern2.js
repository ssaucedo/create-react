import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import Operation from './operation'

const Pattern2 = (props) => {
  return (
    <div>
      <RaisedButton onClick={props.startOperation} label="New operation" primary={true}/>
      <RaisedButton onClick={props.operationQueue} label="Activate queue" primary={true}/>
      <h2>{Object.keys(props.operations).length} total operations</h2>
      <div style={{display: 'flex', flex: 1, flexDirection: 'column', padding: '1rem'}}>
        <div>
          <h3>{'In progress'}</h3>
          <div style={{display: 'flex'}}>
            {Object.values(props.operations).filter(op => op.status === 'IN_PROGRESS').map((op, key) =>
              <Operation key={key} {...op} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/*
 <div>
 <h3>{'Completed'}</h3>
 <div style={{display: 'flex'}}>
 {Object.values(props.operations).filter(op => op.status === 'COMPLETED').map((op, key) =>
 <Operation key={key} {...op} />
 )}
 </div>
 </div>
 */

Pattern2.defaultProps = {
  operations: {},
}

Pattern2.propTypes = {
  startOperation: PropTypes.func.isRequired,
  operationQueue: PropTypes.func.isRequired,
  operations: PropTypes.object,
}

export default Pattern2

