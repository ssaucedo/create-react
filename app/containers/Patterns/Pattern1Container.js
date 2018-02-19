import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Pattern1 from '../../components/Pattern1/Pattern1'

class Pattern1Container extends Component {
  constructor (props) {
    super(props)
    this.interaction = this.interaction.bind(this)
  }

  componentWillMount () {
    this.props.dispatch({
      type: 'SET_APP_CONTEXT',
      payload: {context: this.props.isCreation ? 'CREATION' : 'EDITION'},
    })
  }

  interaction() {
    this.props.dispatch({type: 'CONNECTED_ELEMENT_INTERACTION', payload: {}})
  }

  render () {
    return (
      <Pattern1 interaction={this.interaction} {...this.props} />
    )
  }
}

Pattern1.propTypes = {
  isCreation: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  handledOn: state.context.appContext.handledOn,
  isCreation: state.context.appContext.context === 'CREATION',
  label: state.context.appContext.context,
})

export default connect(mapStateToProps)(Pattern1Container)
