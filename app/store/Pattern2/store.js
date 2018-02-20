import { init } from 'ramda'

const initialOperationState = {
  step: 0,
  status: 'IN_PROGRESS',
  state: {},
  error: {}
}

const initialState = {
  operations: {},
  semaphore: getSemaphore(10),
  queue: []
}

// as we deconstruct there is no sense on setting value properties.
function getSemaphore (value) {
  const semaphore = Object.create(Object.prototype, {
    active: {writable: true, enumerable: true, value: false},
    value: {writable: true, enumerable: true, value: 0},
    limit: {writable: false, enumerable: true, value: value}
  })
  return semaphore
}

export default function state (state = initialState, {type, payload}) {
  switch (type) {
    case 'NEW_OPERATION': {
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
          },
        },
      }
    }

    case 'OPERATION_COMPLETION': {
      return {
        ...state,
        operations: {
          ...state.operations,
          [payload.id]: {
            ...state.operations[payload.id],
            status: 'COMPLETED',
          }
        }
      }
    }

    case 'OPERATION_QUEUE': {
      return {
        ...state,
        semaphore: {
          ...state.semaphore,
          active: !state.semaphore.active,
        },
      }
    }

    case 'ACQUIRE': {
      return {
        ...state,
        semaphore: {
          ...state.semaphore,
          value: state.semaphore.value + 1,
        }
      }
    }

    case 'RELEASE': {
      return {
        ...state,
        semaphore: {
          ...state.semaphore,
          value: state.semaphore.value - 1,
        }
      }
    }

    case 'ADD_TO_QUEUE': {
      return {
        ...state,
        queue: [...state.queue, payload.operation]
      }
    }

    case 'PICK_FROM_QUEUE': {
      return {
        ...state,
        queue: init(state.queue),
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