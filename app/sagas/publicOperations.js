import { takeEvery } from 'redux-saga/effects'
import {flightEditionOperation, OPERATIONS} from './operationsSagas'


function* flightEditionOperationWatcher () {
  yield takeEvery(OPERATIONS.FLIGHT_EDITION.name, flightEditionOperation)
}

export default [flightEditionOperationWatcher]
