import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import state from '../store/reducers'
import rootSagas from '../sagas/rootSagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(combineReducers(state), compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

sagaMiddleware.run(...rootSagas)

export default store