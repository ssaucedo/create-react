import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Pattern3 from '../../components/Patterns/Pattern3'

class Pattern3Container extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Pattern3 {...this.props} />
    )
  }
}

Pattern3.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({isSidebarOpen: state.pattern3.sidebar.open})

export default connect(mapStateToProps)(Pattern3Container)
