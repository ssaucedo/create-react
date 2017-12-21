import React, {Component} from 'react'
import 'babel-polyfill'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {getRoutes} from './config/routes'
import {customHistory} from './config/customHistory'
import store from './store/baseStore'

class App extends Component {
  render() {
    return (getRoutes(customHistory));
  }
}



ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
    , document.getElementById("app"));

