
export default function state(state = {test: {}}, action) {
  switch (action.type) {
    case 'CONNECTED_ELEMENT_INTERACTION':
      return {
        type: 'CONNECTED_ELEMENT_INTERACTION'
      }
    default:
      return state
  }
}