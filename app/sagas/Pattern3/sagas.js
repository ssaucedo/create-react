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

/**
 * Basic flow.
 * This generator coordinates:
 *  - Async calls to BE (check the basicFlowService) and the associated state updates.
 *  - User interactions, (check selection and confirmation steps).
 *  - UI components through redux state.
 *
 *  The idea of keeping all this logic on a centralized
 *  way comes from two main needs:
 *
 *   - Having a simple way to code flows, that can be easily understood by newcomers.
 *   - Code in such way that flows can be easily tested (app/sagas/tests/Pattern3/sagas.spec.js) and extended.
 *
 *  On the usual approach you configure the actions to dispatch on a container (e.g mapDispatchToProps).
 *  Then the user interacts with the application triggering those callbacks.
 *  My understanding is that the (e.g ConfirmationSidebarContainer) container just needs to define
 *  a API for user interactions and does not have to know how itself interacts with other components in a flow.
 *  The flow saga is the responsible of coordination.
 *
 */
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
