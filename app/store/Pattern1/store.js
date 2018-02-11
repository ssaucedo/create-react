const baseContext = {
  appContext: {
    context: 'CREATION', // creation or edition
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
    default:
      return state
  }
}
