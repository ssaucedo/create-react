import { takeEvery } from 'redux-saga/effects'



function * testSaga () {
  console.log('In sagas we trust')
  yield 'WOW!'
}



export default [
  takeEvery("CONNECTED_ELEMENT_INTERACTION", testSaga)
]