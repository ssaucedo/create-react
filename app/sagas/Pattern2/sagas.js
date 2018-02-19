import { takeEvery, call, put, select } from 'redux-saga/effects'
import {laterReturn} from '../helpers'

export default {
  * flow() {
    yield takeEvery('START_NEW_OPERATION', operationDispatcher)
  },
}

// TODO: FORK the operation, so the operation is not aware of the execution mode.
export function* operationFlow (active) {
    // Could be a simple action. This is kept as two for the sake of simplicity.
    yield call(operation)
    if(active) {
      yield put({type: 'RELEASE'})
      yield call(checkQueue)
    }
}


export function *operation () {
  const id = getUniqueId()
  yield put({type: 'NEW_OPERATION', payload: {id}})
  yield call(laterReturn, {})
  yield put({type: 'UPDATE_OPERATION_STEP', payload: {id}})
  yield call(laterReturn, {})
  yield put({type: 'UPDATE_OPERATION_STEP', payload: {id}})
  yield call(laterReturn, {})
  yield put({type: 'UPDATE_OPERATION_STEP', payload: {id}})
  yield put({type: 'OPERATION_COMPLETION', payload: {id}})
}


export function* checkQueue() {
  const semaphore = yield select((state) => state.pattern2.semaphore)
  const queue = yield select((state) => state.pattern2.queue)
  if(semaphore.value !== semaphore.limit && queue.length !== 0) {
    yield put({type: 'PICK_FROM_QUEUE'})
    yield call(operationDispatcher)
  }

}

export function* operationDispatcher() {
  const semaphore = yield select((state) => state.pattern2.semaphore)
  if(semaphore.active) {
    if(semaphore.value === semaphore.limit) {
      yield put({type: 'ADD_TO_QUEUE', payload: {operation: {id: getUniqueId()}}})
    } else {
      yield put({type: 'ACQUIRE', payload: {operation: {id: getUniqueId()}}})
      yield call(operationFlow, semaphore.active)
    }
  } else {
    yield call(operationFlow, false)
  }
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