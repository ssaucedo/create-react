import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import context from './Pattern1/store';
import pattern3 from './Pattern3/store';
import pattern6 from './Pattern6/store';
import tweets from './Pattern6/tweets';
import uiStore from '../store/uiStore';
import rootSagas from '../sagas/rootSagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers({ uiStore, context, pattern3, pattern6, tweets }), compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

sagaMiddleware.run(rootSagas);

export default store;
