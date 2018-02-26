import { operation } from './sagas'
import BuildService from '../service/buildService'
import SSnapProxy from '../tests/mockProxy'
import { call } from 'redux-saga/effects'

// check https://github.com/redux-saga/redux-saga/blob/34c9093684323ab92eacdf2df958f31d9873d3b1/test/interpreter/effectMiddlewares.js#L88

describe.skip('Integration test saga-services:', () => {
  it('Service snapshot Base case', () => {
    const saga = operation(SSnapProxy(BuildService))
    const getAPIEffect = saga.next().value
    expect(getAPIEffect).toEqual(call(BuildService.getAPIVersion))
    const nextEffect = saga.next().value
    expect(getAPIEffect).toEqual(call(BuildService.getUsers))
    const sagaCompletion = saga.next()
    expect(sagaCompletion.done).toEqual(true)
  })
})

/**
 * This is here just because it's nice.
 */
describe.skip('Call effect in Jest:', () => {
  it.skip('Executing CALL Effect in Jest', done => {
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