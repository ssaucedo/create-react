import PropTypes from 'prop-types'
import React, {Component} from 'react'
import ConnectedElement from './ConnectedElement'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toggle from 'material-ui/Toggle';
import {connect} from 'react-redux'


class LandPageContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
        <MuiThemeProvider>
          <Toggle
              onClick={() => this.props.dispatch(
                  {type: 'CHANGE_APP_CONTEXT', payload: {context: this.props.isCreation ? 'EDITION' : 'CREATION'}})}
              toggled={this.props.isCreation}
              label={this.props.label}
          />
          <ConnectedElement dispatch={this.props.dispatch}/>
          <ConnectedElement dispatch={this.props.dispatch}/>
          <ConnectedElement dispatch={this.props.dispatch}/>
          <ConnectedElement dispatch={this.props.dispatch}/>
        </MuiThemeProvider>

    )
  }
}

const mapStateToProps = state => {
  return {
    label: state.context.appContext.context,
    isCreation: state.context.appContext.context === 'CREATION',
  }
}

LandPageContainer.propTypes = {
  label: PropTypes.string.isRequired,
  isCreation: PropTypes.bool.isRequired,
}

const mapDispatchToProps = dispatch => ({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(LandPageContainer)
