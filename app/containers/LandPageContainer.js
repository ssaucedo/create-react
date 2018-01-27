
import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux'
import {
  MainContainer,
  ContentContainer,
  SidebarContainer,
} from './StyledComponents'

import Paper from 'material-ui/Paper';

class LandPageContainer extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    const style = {
      paper: {
        height: '100%',
        display: 'inline-block',
        float: 'left',
      },
    };

    return (
        <MuiThemeProvider>
          <MainContainer>
            <SidebarContainer>
              <Paper style={style.paper}>
              </Paper>
            </SidebarContainer>
            <ContentContainer>
              <Paper style={{
                  ...style.paper,
                width: '100%',
                padding: '20px',
                overflow: 'scroll',
              }}>
                {'CONTENCT'}
              </Paper>
            </ContentContainer>
          </MainContainer>
        </MuiThemeProvider>

    )
  }
}


const mapDispatchToProps = dispatch => ({dispatch})

export default connect(null, mapDispatchToProps)(LandPageContainer)
