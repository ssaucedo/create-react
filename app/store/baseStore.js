import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createAsyncForFlowsMiddleware from 'redux-async-for-flows';
import context from './Pattern1/store';
import pattern2 from './Pattern2/store';
import pattern3 from './Pattern3/store';
import pattern6 from './Pattern6/store';
import tweets from './Pattern6/tweets';
import uiStore from '../store/uiStore';

import { basicFlow } from '../sagas/Pattern3/flows';


const {
  take,
  middleware: asyncMiddleware
} = createAsyncForFlowsMiddleware();

const store = createStore(combineReducers({
  uiStore, context, pattern2, pattern3, pattern6, tweets,
}), compose(
  applyMiddleware(asyncMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

(async function orquestate() {
  while(true) {
    await basicFlow(take, store.getState, store.dispatch)();
  }
})();




export default store;
