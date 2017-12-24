import PropTypes from 'prop-types'
import React, {Component} from 'react'
import ConnectedElement from './ConnectedElement'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toggle from 'material-ui/Toggle';
import {connect} from 'react-redux'
import {
  MainContainer,
  ContentContainer,
  SidebarContainer,
  Pattern,
  FlowSwitch
} from './StyledComponents'

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew';
import ActionReorder from 'material-ui/svg-icons/action/reorder';
import ActionTimeline from 'material-ui/svg-icons/action/timeline';

class LandPageContainer extends Component {

  constructor(props) {
    super(props)
  }


  render() {

    const style = {
      paper: {
        display: 'inline-block',
        float: 'left',
      },
    };

    const {dispatch} = this.props
    const updatePattern = (pattern) => () => dispatch({type: 'CHANGE_PATTERN', payload: {pattern}})
    return (
        <MuiThemeProvider>
          <MainContainer>
            <SidebarContainer>
              <Paper style={style.paper}>
                <Menu>
                  <MenuItem onClick={updatePattern('PATTERN_1')} primaryText="Pattern 1" rightIcon={<ActionAutorenew />}/>
                  <MenuItem onClick={updatePattern('PATTERN_2')} primaryText="Pattern 2" rightIcon={<ActionReorder />}/>
                  <MenuItem onClick={updatePattern('PATTERN_3')} primaryText="Pattern 3" rightIcon={<ActionTimeline />}/>
                </Menu>
              </Paper>
            </SidebarContainer>
            <ContentContainer>
              <Pattern>
                <FlowSwitch>
                  <div>{`${this.props.label}`}</div>
                  <Toggle
                      onClick={() => this.props.dispatch(
                          {
                            type: 'CHANGE_APP_CONTEXT',
                            payload: {context: this.props.isCreation ? 'EDITION' : 'CREATION'}
                          })}
                      toggled={this.props.isCreation}
                  />
                </FlowSwitch>
                <ConnectedElement dispatch={this.props.dispatch}/>
              </Pattern>
            </ContentContainer>
          </MainContainer>
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
