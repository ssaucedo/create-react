const baseUIState = {
  elements: {},
}

export default function baseUI(state = baseUIState, action) {
  switch (action.type) {
    case 'SHOW_ELEMENT':
      return {
          ...state,
          elements: {
            ...state.elements,
            ...action.payload,
          }
      }
    default:
      return state
  }
}