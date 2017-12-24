import React, {Component} from 'react'
import 'babel-polyfill'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {getRoutes} from './config/routes'
import {customHistory} from './config/customHistory'
import store from './store/baseStore'
import {AppContainer} from './containers/StyledComponents'
import './containers/styles.css'

class App extends Component {
  render() {
    return (getRoutes(customHistory));
  }
}


ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App/>
      </Provider>
    </AppContainer>
    , document.getElementById("app"));

