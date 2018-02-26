import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import {
  Pattern,
  HeadLine,
} from '../../containers/StyledComponents';

import Operation from './operation';

const Pattern2 = props => (
    <Pattern>
      <HeadLine>
        {'Concurrency'}
      </HeadLine>
      <p>
        {`This pattern allows to execute a N number of tasks on a concurrent way, giving the appearance of simultaneous execution.
        To handle the number of concurrent tasks a semaphore is being used. As the number is limited if there is no available spot for a process execution the request will be added to a queue.`}
      </p>
      <RaisedButton style={{ margin: '10px' }} onClick={props.startOperation} label="Dispatch 50 operation requests" primary={true}/>
      <RaisedButton style={{ margin: '10px' }} onClick={props.operationQueue} label={!props.active ? 'Activate semaphore (10) && queue' : 'Deactivate semaphore (10) && queue'} secondary={props.active} primary={!props.active}/>
      <h2>{Object.keys(props.operations).length} total operations</h2>
      <div style={{
 display: 'flex', flex: 1, flexDirection: 'column', padding: '1rem',
}}>
        <div>
          <h3>{`In progress ${Object.values(props.operations).filter(op => op.status === 'IN_PROGRESS').length}`}</h3>
          <div style={{ display: 'flex' }}>
            {Object.values(props.operations).filter(op => op.status === 'IN_PROGRESS').map((op, key) =>
              <Operation key={key} {...op} />)}
          </div>
          <div>
            <h3>{`Tasks completed: ${Object.values(props.operations).filter(op => op.status === 'COMPLETED').length}`}</h3>
          </div>
        </div>
      </div>
    </Pattern>
);

Pattern2.defaultProps = {
  operations: {},
  active: false,
};

Pattern2.propTypes = {
  startOperation: PropTypes.func.isRequired,
  operationQueue: PropTypes.func.isRequired,
  operations: PropTypes.object,
  active: PropTypes.bool.isRequired,
};

export default Pattern2;

