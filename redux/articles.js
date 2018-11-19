const axios = require('axios');
const getArticleData = require('../getArticleData')


// Action Types
const SET_RECENT_ARTICLES = 'SET_RECENT_ARTICLES';
// Action Creators
export const setRecentArticles = articles => ({
  type: SET_RECENT_ARTICLES,
  articles,
});
// Thunk Creator
export const fetchRecentArticles = (company, time) => async dispatch => {
  try {
    let newArticles = await getArticleData(company, time)

    dispatch(setRecentArticles(newArticles))

  } catch (error) {
    console.error(error)
  }
};

// Reducer

const initialState = {
  articles: [],
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECENT_ARTICLES:
      return { ...state, articles: [...state.articles, ...action.articles] };
    default:
      return state;
  }
};

export default articlesReducer;
