import { fork } from 'redux-saga/effects';
import { values } from 'ramda';
import pattern1 from './Pattern1/sagas';
import pattern3 from './Pattern3/sagas';
import pattern6 from './Pattern6/publicSagas';

function startSagas(...sagas) {
  return function* rootSaga() {
    yield sagas.map(saga => fork(saga));
  };
}

export default startSagas(
  ...values(pattern1),
  ...values(pattern3),
  ...pattern6,
);
