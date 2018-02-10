const initialFlowState = {
	basic: {
		error: null,
	},
}

const initialSidebarState = {
	open: false,
	loading: true,
	info: [],
}

const initialContext = {
	flow: { ...initialFlowState },
	sidebar: { ...initialSidebarState },
	modal: {
		open: false,
	},
}

export default function context(state = initialContext, action) {
	const { type, payload } = action
	switch (type) {
	case 'UPDATE_SIDEBAR_STATE':
		return {
			...state,
			sidebar: {
				...state.sidebar,
				open: !state.sidebar.open,
			},
		}

	case 'UPDATE_MODAL_STATE':
		return {
			...state,
			modal: {
				open: !state.modal.open,
			},
		}

	case 'UPDATE_SIDEBAR_LOADING':
		return {
			...state,
			sidebar: {
				...state.sidebar,
				loading: payload.loading,
			},
		}

	case 'RESET_FLOW':
		return {
			...initialContext,
		}

	case 'ERROR_ON_BASIC_FLOW':
		return {
			...state,
			flow: {
				basic: {
					...state.flow.basic,
					error: payload,
				},
			},
		}
	default:
		return state
	}
}
