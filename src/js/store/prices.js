import axios from 'axios';

// Action Types
export const SET_CURRENT_PRICE = 'SET_CURRENT_PRICE';
// Action Creators
export const setCurrentPrice = (price) => ({
	type: 'SET_CURRENT_PRICE',
	price
});
// Thunk Creator
export const fetchCurrentStockPrice = (company) => async (dispatch) => {
	try {
		let url = `https://api.iextrading.com/1.0/stock/${company}/price`;
		const {data} = await axios.get(url);
		console.log('this is the shape of price is right: ', data);

		dispatch({type: 'SET_CURRENT_PRICE', data});
	} catch (error) {
		console.error(error);
	}
};

// Reducer

const pricesReducer = (state = 13, action) => {
	switch (action.type) {
		case SET_CURRENT_PRICE:
			return action.price;
		default:
			return state;
	}
};

export default pricesReducer;
