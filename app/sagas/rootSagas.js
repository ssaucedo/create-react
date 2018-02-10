import { fork } from 'redux-saga/effects'
import pattern1 from './Pattern1/sagas'
import pattern3 from './Pattern3/sagas'

function startSagas (...sagas) {
  return function * rootSaga () {
    yield sagas.map(saga => fork(saga))
  }
}

export default startSagas(...pattern1, ...pattern3)