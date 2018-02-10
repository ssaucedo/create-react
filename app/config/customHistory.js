import { createHistory } from 'history'
import { useRouterHistory } from 'react-router'

export const customHistory = useRouterHistory(createHistory)({
	basename: '/',
})
