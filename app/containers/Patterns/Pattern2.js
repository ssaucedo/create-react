import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  Pattern,
} from '../../containers/StyledComponents'
import {OPERATIONS} from '../../sagas/Pattern2/operations'
import FlightEditionContainer from '../FlightEditionContainer'
import { getInProgressOperations } from '../helpers'

const {FLIGHT_EDITION} = OPERATIONS

const Pattern2 = props => {
  console.log('props', props)
  let proc = Object.values(props.inProgress)
  if(proc.length > 3) {
    proc = proc.slice(0,3)
  }

  return (
      <Pattern>
        <div>
          <div>
            <button
                onClick={() => props.dispatch({type: FLIGHT_EDITION.name, payload: {}})}>{FLIGHT_EDITION.name}</button>
          </div>
          {proc.map((p, k) =>
              <FlightEditionContainer dispatch={props.dispatch} id={p.id} key={k}/>
          )}
        </div>
      </Pattern>

  )
}

Pattern2.propTypes = {
  inProgress: PropTypes.object,
}

const mapStateToProps = (state) => ({
  inProgress: getInProgressOperations(state),
})

export default connect(mapStateToProps)(Pattern2)


