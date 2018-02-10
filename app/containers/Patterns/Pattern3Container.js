import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Pattern3 from '../../components/Patterns/Pattern3'

class Pattern3Container extends Component {

  constructor (props) {
    super(props)
  }

  onSetOpen = () => {
    this.props.dispatch({type: 'UPDATE_SIDEBAR_STATE'})
  }

  onStartFlow = () => {
    this.props.dispatch({type: 'USER_STARTS_FLOW'})
  }


  selectModalOption = (option) => {
    this.props.dispatch({type: 'USER_CONFIRMATION_STEP', ...option})
  }

  selectOption = (option) => {
    this.props.dispatch({type: 'USER_SELECTION_STEP', ...option})
  }

  render () {
    return (
      <Pattern3 {...this.props}
                onSetOpen={this.onSetOpen}
                selectOption={this.selectOption}
                selectModalOption={this.selectModalOption}
                onStartFlow={this.onStartFlow}/>
    )
  }
}

Pattern3.propTypes = {
  isSidebarLoading: PropTypes.bool.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
}

const mapStateToProps = state => (
  {
    isSidebarOpen: state.pattern3.sidebar.open,
    isModalOpen: state.pattern3.modal.open,
    isSidebarLoading: state.pattern3.sidebar.loading
  })

export default connect(mapStateToProps)(Pattern3Container)
