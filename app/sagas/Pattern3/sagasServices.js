import { delay } from '../helpers';

export const service = () => delay({ items: [{ id: '1', name: 'first' }, { id: '2', name: 'second' }] })
