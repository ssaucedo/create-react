import { delay } from '../helpers';

export default function* basicFlowService () {
  try {
    return yield delay({ items: [{ id: '1', name: 'first' }, { id: '2', name: 'second' }] });
  } catch (e) {
    return yield { error: 'Error on basicFlowService', reason: JSON.stringify(e) }
  }
}
