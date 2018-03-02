import { operation } from './sagas'
import BuildService from '../service/buildService'
import SSnapProxy from '../tests/mockProxy'
import { call } from 'redux-saga/effects'
import generatorExecutor from '../generatorExecutor'

// check https://github.com/redux-saga/redux-saga/blob/34c9093684323ab92eacdf2df958f31d9873d3b1/test/interpreter/effectMiddlewares.js#L88

function checkAndExecuteEffect (effect, service, fn, saga, effResult) {
  const yieldedEffect = saga.next(effResult).value;
  expect(yieldedEffect).toEqual(effect(service[fn]));
  return service[fn]()
}

describe('Integration test saga-services:', () => {
  it('Service snapshot Base case', done => {
    generatorExecutor(test())
    function* test () {
      const saga = operation(BuildService)
      const effResult = yield checkAndExecuteEffect(call, BuildService, 'getAPIVersion', saga);
      console.log(effResult)
      const effResult2 = yield checkAndExecuteEffect(call, BuildService, 'getUsers', saga, effResult);
      console.log(effResult2);
      expect(saga.next().done).toEqual(true);
      yield done()
    }
  })
})

/**
 * This is here just because it's nice.
 */
describe.skip('Call effect in Jest:', () => {
  it('Executing CALL Effect in Jest', done => {
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