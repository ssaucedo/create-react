import {takeEvery, call, fork, put, take, cancel} from 'redux-saga/effects'

function * changePattern(initialAction) {
  let action = initialAction
  let tasks = []
  while(true) {
    yield [tasks.map(t => cancel(t))]
    const {context} = action.payload
    tasks = yield contextSagaMapper(context).map( s => fork(s))
    yield put({type: 'CHANGE_CONTEXT', payload: {context}})
    action = yield take("CHANGE_APP_CONTEXT")
  }
}


function * changePattern () {
  yield takeEvery('CHANGE_PATTERN', changePattern)
}

export default [changePattern]
