import {takeEvery, fork} from 'redux-saga/effects'


function * connectedElementInteractionOnCreation() {
  console.log('handle on creation')
  yield 'creation'
}

function * connectedElementInteractionOnEdition() {
  console.log('handle on edition')
  yield 'edition'
}

function * appContextChange(action) {
  const {context} = action.payload
  console.log('change context to:', context)

  yield contextSagaMapper(context).map( s => fork(s))
}


function * connectedElementInteractionOnCreationWatcher () {
  yield takeEvery('CONNECTED_ELEMENT_INTERACTION', connectedElementInteractionOnCreation)
}

function * connectedElementInteractionOnEditionWatcher () {
  yield takeEvery('CONNECTED_ELEMENT_INTERACTION', connectedElementInteractionOnEdition)
}

export default [
  function*() {
    yield takeEvery("CHANGE_APP_CONTEXT", appContextChange)
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



