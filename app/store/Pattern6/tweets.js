
const initialState = {
  tweets: {
    '96218244-f160-11e7-8c3f-9a214cf093ae': {
    }
  },
}

export default function tweets(state = initialState , {type, payload}) {
  switch (type) {
    case 'UPDATE_TWEETS': {
      return {
        ...state,
        tweets: {
          ...state.tweets,
          [payload.cycleId]: payload.tweets.reduce((res, t) => {
            res[t.id] = t
            return res
          }, {}),
        },
      }
    }
    case 'REMOVE_CYCLE': {
      return {
        tweets: Object.keys(state.tweets).reduce((res, k) => {
          if (k !== payload.cycleId) {
            res[k] = state.tweets[k]
          }
          return res
        }, {})
      }
    }
    default:
      return state
  }
}