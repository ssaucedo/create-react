import { fork } from 'redux-saga/effects'
import * as test from './flows/sagas'

function startSagas (...sagas) {
  return function * rootSaga () {
    yield sagas.map(saga => fork(saga))
  }
}

export default startSagas(
    test,
)