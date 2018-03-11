import { operation } from './sagas';
import BuildService from '../service/buildService';
import SSnapProxy from '../tests/mockProxy';
import { call } from 'redux-saga/effects';
import {genJest, checkAndExecuteEffect} from './sagasITHelpers';

describe('Integration test saga-services:', () => {
  genJest('gen test', function* test (done) {
    const saga = operation(BuildService)
    const proxied = SSnapProxy.bind({})(BuildService)
    const effResult = yield checkAndExecuteEffect(call, BuildService, proxied, 'getAPIVersion', saga);
    const effResult2 = yield checkAndExecuteEffect(call, BuildService, proxied, 'getUsers', saga, effResult);
    expect(JSON.stringify(effResult2)).toEqual(
      "[{\"id\":1,\"name\":\"Mike\"},{\"id\":2,\"name\":\"Irem\"},{\"id\":3,\"owner\":\"Joe\"}]")
    expect(saga.next().done).toEqual(true);
    yield done()
  })
})
/*
describe('Integration test saga-services:', () => {
  genJest('gen test', function* test (done) {

    const ss = SSnapProxy.bind({})(BuildService)
    const b = yield ss.getBuilds()
    console.log(b)
    done()

  });
});
*/

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