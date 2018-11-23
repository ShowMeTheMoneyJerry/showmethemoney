// the mock action
const getSession = () => {
	const data = {
		type: 'GET_SESSION',
		payload: {}
	};

	return data;
};

export default {
	GET_SESSION: getSession // the action to proxy and the new action to call
};

export const aliases = {
	// this key is the name of the action to proxy, the value is the action
	// creator that gets executed when the proxied action is received in the
	// background
	'user-clicked-alias': () => {
		// this call can only be made in the background script
		chrome.notifications.create();
	}
};
