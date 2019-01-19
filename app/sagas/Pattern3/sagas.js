import { service } from './sagasServices';

export function updateState(type, payload) {
  return { type, payload };
}

export const userFlow = () => async (dispatch, getState, take) => {
  try {
    dispatch({ type: 'UPDATE_SIDEBAR_STATE'})
    dispatch({ type: 'UPDATE_SIDEBAR_LOADING', payload: { loading: true }})
    const res = await service();
    if (res.error) {
      dispatch({ type: 'ERROR_ON_BASIC_FLOW', payload: { ...res }})
      return;
    }

    dispatch({ type: 'UPDATE_SIDEBAR_LOADING', payload: { loading: false }})
    const selectionStep = await take('USER_SELECTION_STEP');
    if (selectionStep.cancel) {
      dispatch({ type: 'RESET_FLOW'})
      return;
    }
    dispatch({ type: 'UPDATE_MODAL_STATE'})
    const confirmationStep = await take('USER_CONFIRMATION_STEP');
    if (confirmationStep.cancel) {
      dispatch({ type: 'RESET_FLOW'})
      return;
    }
    dispatch({ type: 'UPDATE_MODAL_STATE'})
    dispatch({ type: 'RESET_FLOW'})
  } catch (e) {
    dispatch({ type: 'ERROR_ON_BASIC_FLOW', payload: { error: 'Unexpected error on basicFlowService', reason: e }})
  }
}