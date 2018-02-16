import { takeEvery, call, put, take } from 'redux-saga/effects'
import {laterReturn} from '../helpers'

export default {
  * flow() {
    yield takeEvery('START_NEW_OPERATION', operationFlow)
  },
}

export function updateState (type, payload) {
  return {type, payload}
}

export function* operationFlow () {
    // Could be a simple action. This is kept as two for the sake of simplicity.
    const id = getUniqueId()
    yield put({type: 'NEW_OPERATION', payload: {id}})
    yield call(laterReturn, {})
    yield put({type: 'UPDATE_OPERATION_STEP', payload: {id}})
    yield call(laterReturn, {})
    yield put({type: 'UPDATE_OPERATION_STEP', payload: {id}})
    yield call(laterReturn, {})
    yield put({type: 'UPDATE_OPERATION_STEP', payload: {id}})
    yield call(laterReturn, {})
}


/**
 * Helper method to get an UUID
 * @return {string}
 */
function getUniqueId () {
  let i
  let random
  let uuid = ''
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16)
  }
  return uuid
}