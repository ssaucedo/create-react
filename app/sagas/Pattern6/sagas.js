import { put, select, call } from 'redux-saga/effects'
import { searchTwits } from '../../services/Pattern6/TwitterService'

function delay (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}
export function *fetchTweets () {
  try {
    while (true) {
      const {timeSpan} = yield select((state) => {
        return state.pattern6.cycles[state.pattern6.displaying]
      })
      const cycleId = yield select(state => state.pattern6.displaying)
      const searchQuery = yield select(state => state.pattern6.cycles[cycleId].searchQuery)

      if (timeSpan >= 1 && searchQuery.length > 0) {
        const tweets = yield call(searchTwits, searchQuery)
        yield put({type: 'UPDATE_TWEETS', payload: {tweets, cycleId}})
        yield call(delay, timeSpan * 1000)
      } else {
        yield call(delay, 1000)
      }
    }
  } catch (e) {
    console.log(e)
    yield put({
      type: 'UNHANDLED_ERROR_IN_SAGA', payload: {
        type: 'UNHANDLED_ERROR_IN_SAGA', saga: 'fetchTweets', payload: {
          error: e,
        }
      }
    })
  }
}

export function *updateSearchQuery ({payload}) {
  try {
    const {searchQuery} = payload
    yield put({type: 'UPDATE_SEARCH_QUERY', payload: {searchQuery}})
    yield put({type: 'FETCH_TWEETS_CYCLE', payload: {searchQuery}})
  } catch (e) {
    yield put({
      type: 'UNHANDLED_ERROR_IN_SAGA', payload: {
        type: 'UNHANDLED_ERROR_IN_SAGA', saga: 'updateSearchQuery', payload: {
          error: e,
        }
      }
    })
  }

}