const baseContext = {
  sidebar: {
      open: false
  }
}

export default function context(state = baseContext, action) {
  switch (action.type) {
    case 'UPDATE_SIDEBAR_STATE':
      return {
          ...state,
        sidebar: {
          open:  !state.sidebar.open
        }
      }
    default:
      return state
  }
}