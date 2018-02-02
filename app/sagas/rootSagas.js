import { fork } from 'redux-saga/effects'
import pattern1 from './Pattern1/sagas'
import pattern2 from './Pattern2/publicOperations'

function startSagas (...sagas) {
  return function * rootSaga () {
    yield sagas.map(saga => fork(saga))
  }
}

export default startSagas(...pattern1, ...pattern2)