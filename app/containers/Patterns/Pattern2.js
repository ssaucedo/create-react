import React from 'react'
import {
  Pattern,
} from '../../containers/StyledComponents'
import {OPERATIONS} from '../../sagas/operationsSagas'
import FlightEditionContainer from '../FlightEditionContainer'

const {FLIGHT_EDITION} = OPERATIONS

const Pattern2 = props => {
  return (
      <Pattern>
        <div>
          <div>
            <button
                onClick={() => this.props.dispatch({type: FLIGHT_EDITION.name, payload: {}})}>{FLIGHT_EDITION.name}</button>
          </div>
          {Object.values(this.props.inProgress).map((p, k) =>
              <FlightEditionContainer dispatch={this.props.dispatch} id={p.id} key={k}/>
          )}
        </div>
      </Pattern>

  )
}

export default Pattern2