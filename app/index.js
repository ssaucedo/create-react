import React, {Component} from 'react'
import 'babel-polyfill'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {getRoutes} from './config/routes'
import {customHistory} from './config/customHistory'
import state from './store/reducers'

import createSagaMiddleware from 'redux-saga'
import {createStore, compose, applyMiddleware} from 'redux'
import rootSagas from './sagas/rootSagas'

class App extends Component {
  render() {
    return (getRoutes(customHistory));
  }
}

const sagaMiddleware = createSagaMiddleware()

ReactDOM.render(
    <Provider store={
      createStore(state, applyMiddleware(sagaMiddleware),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
      <App/>
    </Provider>
    , document.getElementById("app"));


sagaMiddleware.run(rootSagas)
