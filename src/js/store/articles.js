export default (state = 0, action) => {
	switch (action.type) {
		case 'ADD_COUNT':
			return state + (action.payload || 1);
		default:
			return state;
	}
};
