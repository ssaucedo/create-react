import React from 'react'
import PropTypes from 'prop-types'

const StartButton = props => (<div className="start-flow" onClick={props.onStartFlow}>
	{'START'}
</div>)

StartButton.propTypes = {
	onStartFlow: PropTypes.func.isRequired,
}

export default StartButton

