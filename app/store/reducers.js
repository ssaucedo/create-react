
export default function state(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_STATE':
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}