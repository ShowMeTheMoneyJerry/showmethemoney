// the mock action
const getSession = () => {
	const data = {
		type: GET_SESSION,
		payload: {}
	};

	return data;
};

const getAsyncSession = (orginalAction) => {
	return (dispatch, getState) => {
		originalAction.payload = getState().session[originalAction._sender.tab.id];
		return originalAction;
	};
};

export default {
	GET_SESSION: getSession // the action to proxy and the new action to call
};
