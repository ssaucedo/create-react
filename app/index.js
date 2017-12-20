import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {getRoutes} from './config/routes'
import {customHistory} from './config/customHistory'
import state from './store/reducers'

import createSagaMiddleware from 'redux-saga'
import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import rootSagas from './sagas/rootSagas'


const sagaMiddleware = createSagaMiddleware()

var App = React.createClass({
  render: function () {
    return (getRoutes(customHistory));
  }
});

ReactDOM.render(
    <Provider store={
      createStore(combineReducers({state}), compose(applyMiddleware(sagaMiddleware)))
    }>
      <App/>
    </Provider>
    , document.getElementById("app"));


sagaMiddleware.run(rootSagas)