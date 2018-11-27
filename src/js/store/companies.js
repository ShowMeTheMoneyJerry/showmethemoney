import axios from 'axios';

// Action Types

// Companies
export const ADD_COMPANY = 'ADD_COMPANY';
export const REMOVE_COMPANY = 'REMOVE_COMPANY';

//Prices
export const SET_MOST_RECENT_PRICE = 'SET_MOST_RECENT_PRICE';
export const SET_HISTORICAL_PRICES = 'SET_HISTORICAL_PRICES';

//Articles
export const SET_MOST_RECENT_ARTICLE = 'SET_MOST_RECENT_ARTICLE';
export const SET_HISTORICAL_ARTICLES = 'SET_HISTORICAL_ARTICLES';

// Setting
export const GET_SETTING = 'GET_SETTING';
export const POST_SETTING = 'POST_SETTING';
export const EDIT_SETTING = 'EDIT_SETTING';
export const REMOVE_SETTING = 'REMOVE_SETTING';

// Action Creators
export const removeCompany = comp => ({
  type: 'REMOVE_COMPANY',
  comp,
});

export const addCompany = comp => ({
  type: 'ADD_COMPANY',
  comp,
});

//Prices
export const setMostRecentPrice = result => ({
  type: SET_MOST_RECENT_PRICE,
  result,
});

export const setHistoricalPrices = result => ({
  type: SET_HISTORICAL_PRICES,
  result,
});

//articles

export const setHistoricalArticles = result => ({
  type: 'SET_HISTORICAL_ARTICLES',
  result,
});

// Setting

export const getSetting = result => ({
  type: 'GET_SETTING',
  result,
});

export const postSetting = result => ({
  type: 'POST_SETTING',
  result,
});

export const editSetting = result => ({
  type: 'EDIT_SETTING',
  result,
});

export const removeSetting = result => ({
  type: 'REMOVE_SETTING',
  result,
});

//thunk Creators
export const fetchMostRecentPrice = companyName => async dispatch => {
  try {
    let url = `https://api.iextrading.com/1.0/stock/${companyName}/price`;
    const { data } = await axios.get(url);
    const result = { companyName, data };
    dispatch(setMostRecentPrice(result));
  } catch (error) {
    console.error(error);
  }
};

export const fetchHistoricalPrices = (companyName, time) => async dispatch => {
  try {
    let url = `https://api.iextrading.com/1.0/stock/${companyName}/chart/${time}`;
    const { data } = await axios.get(url);
    const result = { companyName, data };
    dispatch(setHistoricalPrices(result));
  } catch (error) {
    console.error(error);
  }
};

export const fetchHistoricalArticles = (
  companyName,
  time
) => async dispatch => {
  try {
    let url = `https://makescents.herokuapp.com/api/article/${companyName}`;
    const { data } = await axios.get(url);
    const result = { companyName, data };
    dispatch(setHistoricalArticles(result));
  } catch (error) {
    console.error(error);
  }
};

export const fetchSetting = companyName => async dispatch => {
  try {
    let url = `https://makescents.herokuapp.com/api/setting/1/${companyName}`;
    const { data } = await axios.get(url);
    const result = { companyName, data };
    dispatch(getSetting(result));
  } catch (error) {
    console.error(error);
  }
};

export const createSetting = (companyName, setting) => async dispatch => {
  try {
    let url = `https://makescents.herokuapp.com/api/setting/1/${companyName}`;
    const { data } = await axios.post(url, setting);
    const result = { companyName, data };
    dispatch(postSetting(result));
  } catch (err) {
    console.error(err);
  }
};

export const changeSetting = (companyName, setting) => async dispatch => {
  try {
    let url = `https://makescents.herokuapp.com/api/setting/1/${companyName}`;
    const { data } = await axios.put(url, setting);
    const result = { companyName, data };
    dispatch(editSetting(result));
  } catch (err) {
    console.error(err);
  }
};

export const deleteSetting = companyName => async dispatch => {
  try {
    await axios.delete(
      `https://makescents.herokuapp.com/api/setting/1/${companyName}`
    );
    dispatch(removeSetting(companyName));
  } catch (err) {
    console.error(err);
  }
};

// Reducer
const initialState = {
  aapl: {
    recentPrice: 0,
    historicalPrices: [],
    view: 'thumbs-up',
    sentiment: 1,
    recentArticle: {},
    historicalArticles: [],
    setting: {},
  },
  googl: {
    recentPrice: '$ 80.00',
    historicalPrices: [],
    view: 'thumbs-down',
    sentiment: 1,
    recentArticle: {},
    historicalArticles: [],
    setting: {},
  },
  tsla: {
    recentPrice: '$ 80.00',
    historicalPrices: [],
    view: 'thumbs-down',
    sentiment: 1,
    recentArticle: {},
    historicalArticles: [],
    setting: {},
  },
  ebay: {
    recentPrice: '$ 80.00',
    historicalPrices: [],
    view: 'thumbs-down',
    sentiment: 1,
    recentArticle: {},
    historicalArticles: [],
    setting: {},
  },
  msft: {
    recentPrice: '$ 24.56',
    historicalPrices: [],
    view: 'thumbs-middle',
    sentiment: 1,
    recentArticle: {},
    historicalArticles: [],
    setting: {},
  },
};

const companies = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPANY:
      state[action.comp] = {
        recentPrice: 0,
        historicalPrices: [],
      };
      return state;
    // case REMOVE_COMPANY:
    // 	const newState = state;
    // 	delete newState[action.comp];
    // 	return newState;
    case SET_MOST_RECENT_PRICE:
      state[`${action.result.companyName}`].recentPrice = action.result.data;
      return state;
    case SET_HISTORICAL_PRICES:
      state[`${action.result.companyName}`].historicalPrices =
        action.result.data;
      return state;
    case SET_HISTORICAL_ARTICLES:
      state[`${action.result.companyName}`].historicalArticles =
        action.result.data;
      return state;
    case GET_SETTING:
      state[`${action.result.companyName}`].setting = action.result.data;
      return state;
    case POST_SETTING:
      state[`${action.result.companyName}`].setting = action.result.data;
      return state;
    case EDIT_SETTING:
      state[`${action.result.companyName}`].setting = action.result.data;
      return state;
    case REMOVE_SETTING:
      state[`${action.result.companyName}`].setting = {};
      return state;
    default:
      return state;
  }
};

export default companies;
