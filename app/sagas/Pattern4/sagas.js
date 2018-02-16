import { takeLatest, call, put, take } from 'redux-saga/effects'
import basicFlowService from './sagasServices'

export default {
  * flow() {
    yield takeLatest('USER_STARTS_FLOW', basicFlow)
  },
}

export function updateState (type, payload) {
  return {type, payload}
}


export function* basicFlow () {
  try {
    // Could be a simple action. This is kept as two for the sake of simplicity.
    yield put(updateState('UPDATE_SIDEBAR_STATE'))
    yield put(updateState('UPDATE_SIDEBAR_LOADING', {loading: true}))  // UI update
    const res = yield call(basicFlowService) // BE call.
    if (res.error) {
      return yield put(updateState('ERROR_ON_BASIC_FLOW', {...res}))   // BE error handling.
    }

    yield put(updateState('UPDATE_SIDEBAR_LOADING', {loading: false}))  // UI update
    const selectionStep = yield take('USER_SELECTION_STEP')             // Wait for user interaction
    if (selectionStep.cancel) {
      return yield put(updateState('RESET_FLOW'))                       // Handle user cancelling.
    }
    yield put(updateState('UPDATE_MODAL_STATE'))                        // UI update, open modal.
    const confirmationStep = yield take('USER_CONFIRMATION_STEP')       // Wait for user interaction (on the Modal)
    if (confirmationStep.cancel) {
      return yield put(updateState('RESET_FLOW'))                       // Handle user cancelling.
    }
    yield put(updateState('UPDATE_MODAL_STATE'))                        // UI update, close modal.
    yield put(updateState('RESET_FLOW'))                                // Clean flow state.
  } catch (e) {                                                         // Handle unexpected error.
    return yield put(updateState('ERROR_ON_BASIC_FLOW', {error: 'Unexpected error on basicFlowService', reason: e}))
  }
}
