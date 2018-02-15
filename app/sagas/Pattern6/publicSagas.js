import { takeLatest, take } from 'redux-saga/effects'
import {fetchTweets, updateSearchQuery} from './sagas'

function* fetchTweetsWatcher () {
  yield takeLatest('FETCH_TWEETS_CYCLE', fetchTweets)
}

function* updateSearchQueryWatcher () {
  yield takeLatest('UPDATE_SEARCH_QUERY_SAGA', updateSearchQuery)
}

export default [fetchTweetsWatcher, updateSearchQueryWatcher]