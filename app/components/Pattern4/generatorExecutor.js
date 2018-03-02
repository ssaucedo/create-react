function resolvePromise(val, gen) {
  return val.then((r) => {
    console.log('RESOLVED PROMISE')
    next(gen, r);
  });
}

function isPromise(val) {
  return typeof val.then === 'function';
}

function next(gen, res) {
  const yielded = gen.next(res);
  if (!yielded.done) {
    if (yielded.value && isPromise(yielded.value)) {
      return resolvePromise(yielded.value, gen);
    } else if (Array.isArray(yielded.value)) {
      if (yielded.value.every(isPromise)) {
        return resolvePromise(Promise.all(yielded.value), gen);
      } else {
        return next(gen, yielded.value);
      }
    } else {
      return next(gen, yielded.value);
    }
  }
  console.log(res)
  return res;
}

function generatorExecutor(gen) {
  const res = next(gen, arguments);
  return res;
}

export default generatorExecutor;
