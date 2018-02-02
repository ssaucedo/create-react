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
  return (
      <Pattern>
        <div>
          <div>
            <button
                onClick={() => props.dispatch({type: FLIGHT_EDITION.name, payload: {}})}>{FLIGHT_EDITION.name}</button>
          </div>
          {Object.values(props.inProgress).map((p, k) =>
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


