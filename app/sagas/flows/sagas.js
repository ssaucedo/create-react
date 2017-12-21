import {takeEvery, call, fork, put, take, cancel} from 'redux-saga/effects'


function * connectedElementInteractionOnCreation() {
  console.log('handle on creation')
  yield 'creation'
}

function * connectedElementInteractionOnEdition() {
  console.log('handle on edition')
  yield 'edition'
}

function * appContextChange(initialAction) {
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


function * connectedElementInteractionOnCreationWatcher () {
  yield takeEvery('CONNECTED_ELEMENT_INTERACTION', connectedElementInteractionOnCreation)
}

function * connectedElementInteractionOnEditionWatcher () {
  yield takeEvery('CONNECTED_ELEMENT_INTERACTION', connectedElementInteractionOnEdition)
}

export default [
  function*() {
    yield call(appContextChange, yield take("CHANGE_APP_CONTEXT"))
  }
]


const contextSagaMapper = context => {
  switch (context) {
    case 'CREATION':
      return [connectedElementInteractionOnCreationWatcher]
    case 'EDITION':
      return [connectedElementInteractionOnEditionWatcher]
  }
}



