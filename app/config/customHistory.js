import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';

const customHistory = useRouterHistory(createHistory)({
  basename: '/',
});

export default customHistory;
