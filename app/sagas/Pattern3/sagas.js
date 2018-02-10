import { takeLatest, call, put, take } from 'redux-saga/effects'
import basicFlowService from './sagasServices'

export default {
	* flow() {
		yield takeLatest('USER_STARTS_FLOW', basicFlow)
	},
}

export function updateState(type, payload) {
	return { type, payload }
}

/**
 * Basic flow.
 * @TODO Code updates, add agents concept.
 * @TODO Update components styles.
 * @TODO Add comments.
 * @TODO Add flow and dummy components tests. (CORE)
 * @return {*}
 */
export function* basicFlow() {
	try {
		// state is updated from the flow.
		yield put(updateState('UPDATE_SIDEBAR_STATE'))
		yield put(updateState('UPDATE_SIDEBAR_LOADING', { loading: true }))
		const res = yield call(basicFlowService)
		if (res.error) {
			return yield put(updateState('ERROR_ON_BASIC_FLOW', { ...res }))
		}
		yield put(updateState('UPDATE_SIDEBAR_LOADING', { loading: false }))
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
	} catch (e) {
		return yield put(updateState('ERROR_ON_BASIC_FLOW', { error: 'Unexpected error on basicFlowService', reason: e }))
	}
}
