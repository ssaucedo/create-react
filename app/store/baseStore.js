import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import state from '../store/reducers'
import appContext from '../store/appContext'
import uiStore from '../store/uiStore'
import rootSagas from '../sagas/rootSagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(combineReducers({state, uiStore, appContext}), compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

sagaMiddleware.run(...rootSagas)

export default store