import { operation } from './sagas';
import BuildService from '../service/buildService';
import SSnapProxy from '../tests/mockProxy';
import { call } from 'redux-saga/effects';
import {genJest, checkAndExecuteEffect} from './sagasITHelpers';

describe('Integration test saga-services:', () => {
  genJest('gen test', function* test (done) {
    const saga = operation(BuildService)
    const effResult = yield checkAndExecuteEffect(call, BuildService, 'getAPIVersion', saga);
    const effResult2 = yield checkAndExecuteEffect(call, BuildService, 'getUsers', saga, effResult);
    expect(saga.next().done).toEqual(true);
    yield done()
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