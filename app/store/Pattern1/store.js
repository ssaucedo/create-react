const baseContext = {
  appContext: {
    context: 'CREATION', // creation or edition
    handledOn: '',
  },
}

export default function context (state = baseContext, action) {
  switch (action.type) {
    case 'CHANGE_CONTEXT':
      return {
        ...state,
        appContext: {
          ...state.appContext,
          context: action.payload.context,
        },
      }

      case 'HANDLED_ON':
      return {
        ...state,
        appContext: {
          ...state.appContext,
          handledOn: action.payload.context,
        },
      }
    default:
      return state
  }
}
