import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Pattern1 from '../../components/Patterns/Pattern1'

class Pattern1Container extends Component {

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.props.dispatch(
      {
        type: 'SET_APP_CONTEXT',
        payload: {context: this.props.isCreation ? 'CREATION' : 'EDITION'}
      })
  }

  render () {
    return (
      <div>
        <Pattern1 {...this.props} />
      </div>
    )
  }
}

Pattern1.propTypes = {
  isCreation: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  return {
    isCreation: state.context.appContext.context === 'CREATION',
    label: state.context.appContext.context,
  }
}

export default connect(mapStateToProps)(Pattern1Container)
