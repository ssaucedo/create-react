
import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  MainContainer,
  ContentContainer,
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
        width: '100%',
        display: 'inline-block',
        padding: '20px',
      },
    };

    return (
        <MuiThemeProvider>
          <MainContainer>
            <ContentContainer>
              <Paper style={style.paper}>
                {'Content'}
              </Paper>
            </ContentContainer>
          </MainContainer>
        </MuiThemeProvider>

    )
  }
}



export default LandPageContainer
