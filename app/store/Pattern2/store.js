
const initialOperationState = {
  step: 0,
  status: 'IN_PROGRESS',
  state: {},
  error: {}
}

const initialState = {
  operations: {},
  operationIds: {},
}

export default function state (state = initialState, {type, payload}) {
  switch (type) {
    case 'NEW_OPERATION': {
      console.log(type)
      console.log(payload)
      return {
        ...state,
        operations: {
          ...state.operations,
          [payload.id]: {
            ...initialOperationState
          }

        }
      }
    }
    case 'UPDATE_OPERATION_STEP': {
      return {
        ...state,
        operations: {
          ...state.operations,
          [payload.id]: {
            ...state.operations[payload.id],
            step: state.operations[payload.id].step + 1
          }

        }
      }
    }

    default:
      return state
  }
}

/**
 * Helper method to get an UUID
 * @return {string}
 */
function getUniqueId () {
  let i
  let random
  let uuid = ''
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16)
  }
  return uuid
}