import { takeEvery } from 'redux-saga/effects'
import {flightEditionOperation, OPERATIONS} from './operations'


function* flightEditionOperationWatcher () {
  yield takeEvery(OPERATIONS.FLIGHT_EDITION.name, flightEditionOperation)
}

export default [flightEditionOperationWatcher]
