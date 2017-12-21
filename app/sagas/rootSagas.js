import { fork } from 'redux-saga/effects'
import sagas from './flows/sagas'

function startSagas (...sagas) {
  return function * rootSaga () {
    console.log(sagas)
    yield sagas.map(saga => fork(saga))
  }
}

export default startSagas(sagas)