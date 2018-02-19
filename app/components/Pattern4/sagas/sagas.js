import { takeEvery, call, put, select } from 'redux-saga/effects'



export default {
  /**
   *
   * @param service Type BuildService
   */
  * operation(service) {
    yield takeEvery('SERVICE_OPERATION', operation, service)
  },
}

export function *operation (service) {
  const v = yield call(service.getAPIVersion)
  if(v === '0.2') {
    console.log('Retrieving users')
    const users = yield call(service.getUsers)
  } else {
    console.log('Retrieving builds')
    const builds = yield call(service.getBuilds)
  }
}