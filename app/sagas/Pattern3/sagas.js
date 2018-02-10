import { takeLatest, call, fork, put, take, cancel } from 'redux-saga/effects'
import basicFlowService from './sagasServices'

const updateState = (type, payload) => ({type, payload})

/**
 * Basic flow.
 * @TODO Code updates, add agents concept.
 * @TODO Update components styles.
 * @TODO Add comments.
 * @TODO Add flow and dummy components tests. (CORE)
 * @return {*}
 */
function * basicFlow () {
  // state is updated from the flow.
  yield put(updateState('UPDATE_SIDEBAR_STATE'))
  yield put(updateState('UPDATE_SIDEBAR_LOADING', {loading: true}))
  let res = yield call(basicFlowService)
  if (res.error) {
    yield put(updateState('ERROR_ON_BASIC_FLOW', {...res}))
  }
  yield put(updateState('UPDATE_SIDEBAR_LOADING', {loading: false}))
  console.log('Info retrieved', res.items)
  const selectionStep = yield take('USER_SELECTION_STEP')
  if (selectionStep.cancel) {
    return yield put(updateState('RESET_FLOW'))
  }
  yield put(updateState('UPDATE_MODAL_STATE'))
  const confirmationStep = yield take('USER_CONFIRMATION_STEP')
  if (confirmationStep.cancel) {
    return yield put(updateState('RESET_FLOW'))
  }
  yield put(updateState('UPDATE_MODAL_STATE'))
  yield put(updateState('RESET_FLOW'))
}

export default [
  function* () {
    yield takeLatest('USER_STARTS_FLOW', basicFlow)
  },
]

