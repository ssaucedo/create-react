import React, { Component } from 'react'
import 'babel-polyfill'
import ReactDOM from 'react-dom'

import { getRoutes } from './config/routes'
import { customHistory } from './config/customHistory'
import { AppContainer } from './containers/StyledComponents'
import './containers/styles.css'

class App extends Component {
  render () {
    return (getRoutes(customHistory))
  }
}

ReactDOM.render(
  <AppContainer>
    <App/>
  </AppContainer>
  , document.getElementById('app'))

