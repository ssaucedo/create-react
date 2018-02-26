/**
 * Helper method to get an UUID
 * @return {string}
 */
function getUniqueId() {
  let i;
  let random;
  let uuid = '';
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}


const initialCycleInfo = {
  searchQuery: '',
  timeSpan: 10,
};

const initialState = {
  cycles: {
    '96218244-f160-11e7-8c3f-9a214cf093ae': {
      ...initialCycleInfo,
    },
  },
  displaying: '96218244-f160-11e7-8c3f-9a214cf093ae',
  errors: [],
};


export default function state(state = initialState, { type, payload }) {
  switch (type) {
    case 'UPDATE_TIME_SPAN': {
      const cycleId = state.displaying;
      return {
        ...state,
        cycles: {
          ...state.cycles,
          [cycleId]: {
            ...state.cycles[cycleId],
            timeSpan: payload.span,
          },
        },
      };
    }
    case 'UPDATE_SEARCH_QUERY': {
      const cycleId = state.displaying;
      return {
        ...state,
        cycles: {
          ...state.cycles,
          [cycleId]: {
            ...state.cycles[cycleId],
            searchQuery: payload.searchQuery,
          },
        },
      };
    }

    case 'ADD_NEW_CYCLE': {
      const uuid = getUniqueId();
      return {
        ...state,
        displaying: uuid,
        cycles: {
          ...state.cycles,
          [uuid]: {
            ...initialCycleInfo,
          },
        },
      };
    }

    case 'DISPLAY_CYCLE':
      return {
        ...state,
        displaying: payload.cycleId,
      };

    case 'REMOVE_CYCLE': {
      return {
        ...state,
        cycles: Object.keys(state.cycles).reduce((res, k) => {
          if (k !== payload.cycleId) {
            res[k] = state.cycles[k];
          }
          return res;
        }, {}),
      };
    }
    case 'UNHANDLED_ERROR_IN_SAGA': {
      return {
        ...state,
        errors: [...state.errors, payload],
      };
    }
    default:
      return state;
  }
}