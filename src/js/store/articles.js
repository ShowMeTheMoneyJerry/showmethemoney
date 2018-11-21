const axios = require('axios');
//const getArticleData = require('../../../getArticleData')

//Action Types
export const SET_MOST_RECENT_ARTICLE = 'SET_MOST_RECENT_ARTICLE';
export const SET_HISTORICAL_ARTICLES = 'SET_HISTORICAL_ARTICLES';

// Action Creators
export const setMostRecentArticle = article => ({
  type: 'SET_MOST_RECENT_ARTICLE',
  article,
});

export const setHistoricalArticles = articles => ({
  type: 'SET_HISTORICAL_ARTICLES',
  articles,
});

//Thunk Creator
export const fetchMostRecentPrice = (company, time) => async dispatch => {
  try {
    const { data } = await getArticleData(company, time)
    console.log('this is the shape of price is right: ', data);



    dispatch(setMostRecentArticle(data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchHistoricalArticles = (company, time) => async dispatch => {
  try {
    let url = `https://api.iextrading.com/1.0/stock/${company}/chart/${time}`;
    const { data } = await axios.get(url);
    console.log('this is the shape of historical prices: ', data);



    dispatch(setHistoricalArticles(data));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
const initialState = {
  recentArticle: {},
  historicalArticles: [{}, 50, 70, -10, -50, 0, 10],
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOST_RECENT_ARTICLE:
      return {
        recentArticle: action.article,
        historicalArticles: state.historicalArticles,
      };
    case SET_HISTORICAL_ARTICLES:
      return {
        recentArticle: state.recentArticle,
        historicalArticles: action.articles,
      };

    default:
      return state;
  }
};

export default articlesReducer;
