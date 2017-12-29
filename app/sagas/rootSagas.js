import sagas from './flows/sagas'
import { fork } from 'redux-saga/effects'
import publicOperations from './publicOperations'

function startSagas (...sagas) {
  return function * rootSaga () {
    yield sagas.map(saga => fork(saga))
  }
}

export default startSagas(...sagas, ...publicOperations)