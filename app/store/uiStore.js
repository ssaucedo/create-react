

const baseUIState = {
  elements: {},
  content: {
    pattern: '' // one of PATTERN_1, PATTERN_2, PATTERN_3
  }
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