import axios from 'axios';

// Action Types
export const SET_MOST_RECENT_PRICE = 'SET_MOST_RECENT_PRICE';
export const SET_HISTORICAL_PRICES = 'SET_HISTORICAL_PRICES';
export const SET_CURRENT_PRICE = 'SET_CURRENT_PRICE';

// Action Creators
export const setCurrentPrice = (price) => ({
	type: 'SET_CURRENT_PRICE',
	price
});

export const setMostRecentPrice = (price) => ({
	type: 'SET_MOST_RECENT_PRICE',
	price
});

export const setHistoricalPrices = (prices) => ({
	type: 'SET_HISTORICAL_PRICES',
	prices
});

//Thunk Creator
export const fetchMostRecentPrice = (company) => async (dispatch) => {
	try {
		let url = `https://api.iextrading.com/1.0/stock/${company}/price`;
		const {data} = await axios.get(url);
		console.log('this is the shape of price is right: ', data);
		dispatch(setMostRecentPrice(data));
	} catch (error) {
		console.error(error);
	}
};
export const fetchHistoricalPrices = (company, time) => async (dispatch) => {
	try {
		let url = `https://api.iextrading.com/1.0/stock/${company}/chart/${time}`;
		const {data} = await axios.get(url);
		console.log('this is the shape of historical prices: ', data);
		dispatch(setHistoricalPrices(data));
	} catch (error) {
		console.error(error);
	}
};

// Reducer
const initialState = {
	recentPrice: 0,
	historicalPrices: []
};

const pricesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_MOST_RECENT_PRICE:
			return {
				recentPrice: action.price,
				historicalPrices: state.historicalPrices
			};
		case SET_HISTORICAL_PRICES:
			return {
				recentPrice: state.recentPrice,
				historicalPrices: action.prices
			};

		default:
			return state;
	}
};

export default pricesReducer;
