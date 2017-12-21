import React, {Component} from 'react'
import ConnectedElement from './ConnectedElement'
import {connect} from 'react-redux'

class LandPageContainer extends Component {

  render() {
    return (
        <div>
          <ConnectedElement dispatch={this.props.dispatch} />
          <ConnectedElement dispatch={this.props.dispatch} />
          <ConnectedElement dispatch={this.props.dispatch} />
          <ConnectedElement dispatch={this.props.dispatch} />
        </div>

    )
  }
}

const mapStateToProps = props => ({})

const mapDispatchToProps = dispatch => ({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(LandPageContainer)
