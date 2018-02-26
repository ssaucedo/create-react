import { operation } from './sagas'
import BuildService from '../service/buildService'
import SSnap from '../tests/mockServices'
import { takeEvery, call, put, select } from 'redux-saga/effects'

// check https://github.com/redux-saga/redux-saga/blob/34c9093684323ab92eacdf2df958f31d9873d3b1/test/interpreter/effectMiddlewares.js#L88

describe('Integration test saga-services:', () => {

  /*
   *  Saga - Service integration test.
   */
  it('Base case', done => {
    const saga = operation(BuildService)
    const effect = saga.next().value
    expect(effect).toEqual(call(BuildService.getAPIVersion))
    effect.CALL.fn(...effect.CALL.args).then(res => {
      expect(res).toEqual(0.2)
      const nextEffect = saga.next(0.2).value
      expect(nextEffect).toEqual(call(BuildService.getUsers))
      const sagaCompletion = saga.next()
      expect(sagaCompletion.done).toEqual(true)
      done()
    })
  })
})

describe.skip('Integration test saga-services:', () => {
  it('Service snapshot Base case', done => {
    const saga = operation(SSnap(BuildService))
    const effect = saga.next().value
    done()
  })
})