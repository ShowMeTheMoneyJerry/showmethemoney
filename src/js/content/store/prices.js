// Action Types
export const SET_CURRENT_PRICE = 'SET_CURRENT_PRICE';
// Action Creators
export const setCurrentPrice = (price) => ({
	type: 'SET_CURRENT_PRICE',
	price
});
// Thunk Creator

// Reducer

const pricesReducer = (state = [ 'hello' ], action) => {
	switch (action.type) {
		case 'SET_CURRENT_PRICE':
			return action.payload;
		default:
			return state;
	}
};

export default pricesReducer;
