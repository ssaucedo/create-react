import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { OPERATIONS } from '../sagas/Pattern2/operations'
import { getOperationInfo, triggerAction } from './helpers'
import { FlightEdition } from './FlightEdition'

class FlightEditionContainer extends React.Component {
	render () {
		const {dispatch} = this.props
		const {FLIGHT_EDITION} = OPERATIONS
		const id = this.props.id
		return (
			<div>
				<h2>{id}</h2>
				<FlightEdition
					id={id}
					FLIGHT_EDITION={FLIGHT_EDITION}
					{...this.props.flightEdition}
					triggerAction={triggerAction(id, dispatch)}/>
			</div>
		)
	}
}

FlightEditionContainer.propTypes = {
	dispatch: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	flightEdition: PropTypes.shape({
		operation: PropTypes.object,
		succeed: PropTypes.object,
		failed: PropTypes.object,
		step: PropTypes.string,
		steps: PropTypes.object,
	}),

}

const mapStateToProps = (state, props) => {
	const {id} = props
	return {
		flightEdition: {
			...getOperationInfo(id, OPERATIONS.FLIGHT_EDITION.name, state.operations),
		},
	}
}

export default connect(mapStateToProps)(FlightEditionContainer)
