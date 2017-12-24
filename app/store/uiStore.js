

const baseUIState = {
  elements: {},
  content: {
    pattern: 'PATTERN_1' // one of PATTERN_1, PATTERN_2, PATTERN_3
  }
}

export default function baseUI(state = baseUIState, action) {
  switch (action.type) {
    case 'CHANGE_PATTERN':
      return {
          ...state,
          content: {
              ...state.content,
              pattern: action.payload.pattern,
          }
      }
    default:
      return state
  }
}