import {takeEvery, call, fork, put, take, cancel} from 'redux-saga/effects'


function * connectedElementInteractionOnCreation() {
  console.log('handle on creation')
  yield 'creation'
}

function * connectedElementInteractionOnEdition() {
  console.log('handle on edition')
  yield 'edition'
}

function * connectedElementInteractionOnCreationWatcher () {
  yield takeEvery('CONNECTED_ELEMENT_INTERACTION', connectedElementInteractionOnCreation)
}

function * connectedElementInteractionOnEditionWatcher () {
  yield takeEvery('CONNECTED_ELEMENT_INTERACTION', connectedElementInteractionOnEdition)
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

/**
 * Default sagas are OnCreation sagas.
 * @param context
 * @return {[*]}
 */
const contextSagaMapper = context => {
  switch (context) {
    case 'CREATION':
      return [connectedElementInteractionOnCreationWatcher]
    case 'EDITION':
      return [connectedElementInteractionOnEditionWatcher]
    default:
      return [connectedElementInteractionOnCreationWatcher]
  }
}

export default {
  appContextSwitch: function*() {
    yield call(appContextChange, yield take("SET_APP_CONTEXT"))
  },
}

