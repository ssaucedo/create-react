import basicFlowService from './sagasServices';

export function updateState(type, payload) {
  return { type, payload };
}

export const basicFlow = (take, getState, dispatch) => async function basicFlow() {
  try {
    await take('USER_STARTS_FLOW');
    dispatch(updateState('UPDATE_SIDEBAR_STATE'));
    dispatch(updateState('UPDATE_SIDEBAR_LOADING', { loading: true }));
    const res = await basicFlowService;
    if (res.error) {
      return dispatch(updateState('ERROR_ON_BASIC_FLOW', { ...res }));
    }

    dispatch(updateState('UPDATE_SIDEBAR_LOADING', { loading: false }));  // UI update
    const selectionStep = await take('USER_SELECTION_STEP');
    if (selectionStep.cancel) {
      return dispatch(updateState('RESET_FLOW'));
    }
    dispatch(updateState('UPDATE_MODAL_STATE'));
    const confirmationStep = await take('USER_CONFIRMATION_STEP');
    if (confirmationStep.cancel) {
      return dispatch(updateState('RESET_FLOW'));
    }
    dispatch(updateState('UPDATE_MODAL_STATE'));
    dispatch(updateState('RESET_FLOW'));
  } catch (e) {
    return dispatch(updateState('ERROR_ON_BASIC_FLOW', { error: 'Unexpected error on basicFlowService', reason: e }));
  }
}



