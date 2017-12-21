


const baseUI = {
  elements: {},
}

export default function baseUI(state = baseUI, action) {
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