import { fork } from 'redux-saga/effects'
import pattern1 from './Pattern1/sagas'
import pattern3 from './Pattern3/sagas'
import { values } from 'ramda'

function startSagas (...sagas) {
  return function * rootSaga () {
    yield sagas.map(saga => fork(saga))
  }
}

export default startSagas(
  ...values(pattern1),
  ...values(pattern3))