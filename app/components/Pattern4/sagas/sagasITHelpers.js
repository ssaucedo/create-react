import generatorExecutor from '../generatorExecutor'

/**
 *
 * @param effect
 * @param service
 * @param fn
 * @param saga
 * @param effResult
 * @return {*}
 */
function checkAndExecuteEffect (effect, service, fn, saga, effResult) {
  const yieldedEffect = saga.next(effResult).value;
  expect(yieldedEffect).toEqual(effect(service[fn]));
  return service[fn]();
}

function genJest (name, gen) {
  return it(name, done => {
    generatorExecutor(gen(done));
  });
}

export default {genJest, checkAndExecuteEffect};
