import axios from 'axios';

// Action Types

// Companies
export const ADD_COMPANY = 'ADD_COMPANY';
export const REMOVE_COMPANY = 'REMOVE_COMPANY';

//Prices
export const SET_MOST_RECENT_PRICE = 'SET_MOST_RECENT_PRICE';
export const SET_HISTORICAL_PRICES = 'SET_HISTORICAL_PRICES';

// Action Creators
export const removeCompany = (comp) => ({
	type: 'REMOVE_COMPANY',
	comp
});

export const addCompany = (comp) => ({
	type: 'ADD_COMPANY',
	comp
});

//Prices
export const setMostRecentPrice = (result) => ({
	type: SET_MOST_RECENT_PRICE,
	result
});

export const setHistoricalPrices = (result) => ({
	type: SET_HISTORICAL_PRICES,
	result
});

//thunk Creators
export const fetchMostRecentPrice = (companyName) => async (dispatch) => {
	try {
		let url = `https://api.iextrading.com/1.0/stock/${companyName}/price`;
		const {data} = await axios.get(url);
		console.log('most recent price companies.js: ', data);
		const result = {companyName, data};
		dispatch(setMostRecentPrice(result));
	} catch (error) {
		console.error(error);
	}
};

export const fetchHistoricalPrices = (companyName, time) => async (dispatch) => {
	try {
		let url = `https://api.iextrading.com/1.0/stock/${companyName}/chart/${time}`;
		const {data} = await axios.get(url);
		console.log('historical prices: ', data);
		const result = {companyName, data};
		dispatch(setHistoricalPrices(result));
	} catch (error) {
		console.error(error);
	}
};

// Reducer
const initialState = {
	aapl: {
		recentPrice: 0,
		historicalPrices: [],
		view: 'thumbs-up',
		sentiment: 1
	},
	googl: {
		recentPrice: '$ 80.00',
		historicalPrices: [],
		view: 'thumbs-down',
		sentiment: 1
	},
	tsla: {
		recentPrice: '$ 80.00',
		historicalPrices: [],
		view: 'thumbs-down',
		sentiment: 1
	},
	ebay: {
		recentPrice: '$ 80.00',
		historicalPrices: [],
		view: 'thumbs-down',
		sentiment: 1
	},
	msft: {
		recentPrice: '$ 24.56',
		historicalPrices: [],
		view: 'thumbs-middle',
		sentiment: 1
	}
};

const companies = (state = initialState, action) => {
	switch (action.type) {
		case ADD_COMPANY:
			state[action.comp] = {
				recentPrice: 0,
				historicalPrices: []
			};
			return state;
		// case REMOVE_COMPANY:
		// 	const newState = state;
		// 	delete newState[action.comp];
		// 	return newState;
		case SET_MOST_RECENT_PRICE:
			state[`${action.result.companyName}`].recentPrice = action.result.data;
			console.log('most recent aapl price:', state[`${action.result.companyName}`]);
			return state;
		case SET_HISTORICAL_PRICES:
			state[`${action.result.companyName}`].historicalPrices = action.result.data;
			return state;
		default:
			return state;
	}
};

export default companies;
