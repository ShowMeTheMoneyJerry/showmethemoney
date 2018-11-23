import axios from 'axios';
import getArticleData from '../../../getArticleData';

//Mark's Code

// // Action Types
// const SET_RECENT_ARTICLES = 'SET_RECENT_ARTICLES';
// // Action Creators
// export const setRecentArticles = (articles) => ({
// 	type: SET_RECENT_ARTICLES,
// 	articles
// });
// // Thunk Creator
// export const fetchRecentArticles = (company, time) => async (dispatch) => {
// 	try {
// 		let newArticles = await getArticleData(company, time);

// 		dispatch(setRecentArticles(newArticles));
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// // Reducer

// const initialState = {
// 	articles: [ 'Potato Stocks Rise' ]
// };

// const articlesReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case SET_RECENT_ARTICLES:
// 			return {articles: []};
// 		default:
// 			return state;
// 	}

//Action Types
export const SET_MOST_RECENT_ARTICLE = 'SET_MOST_RECENT_ARTICLE';
export const SET_HISTORICAL_ARTICLES = 'SET_HISTORICAL_ARTICLES';

// Action Creators
export const setMostRecentArticle = (article) => ({
	type: 'SET_MOST_RECENT_ARTICLE',
	article
});

export const setHistoricalArticles = (articles) => ({
	type: 'SET_HISTORICAL_ARTICLES',
	articles
});

//Thunk Creator
export const fetchMostRecentPrice = (company, time) => async (dispatch) => {
	try {
		const {data} = await getArticleData(company, time);
		console.log('this is the shape of price is right: ', data);

		dispatch(setMostRecentArticle(data));
	} catch (error) {
		console.error(error);
	}
};

export const fetchHistoricalArticles = (company, time) => async (dispatch) => {
	try {
		let url = `https://api.iextrading.com/1.0/stock/${company}/chart/${time}`;
		const {data} = await axios.get(url);
		console.log('this is the shape of historical prices: ', data);

		dispatch(setHistoricalArticles(data));
	} catch (error) {
		console.error(error);
	}
};

// Reducer
const initialState = {
	recentArticle: {},
	historicalArticles: [
		{
			sentiment: 10,
			link: 'https://finance.yahoo.com/news/tim-cook-spends-first-two-133404480.html?.tsrc=rss',
			date: 'Tue, 15 Nov 2018 13:34:04 +0000',
			title: '10 High-Tech Gifts That Cost Less Than $100'
		},
		{
			sentiment: 40,
			link: 'https://finance.yahoo.com/news/tim-cook-spends-first-two-133404480.html?.tsrc=rss',
			date: 'Tue, 16 Nov 2018 13:34:04 +0000',
			title: '10 High-Tech Gifts That Cost Less Than $100'
		},
		{
			sentiment: -30,
			link: 'https://finance.yahoo.com/news/tim-cook-spends-first-two-133404480.html?.tsrc=rss',
			date: 'Tue, 17 Nov 2018 13:34:04 +0000',
			title: '10 High-Tech Gifts That Cost Less Than $100'
		},
		{
			sentiment: -50,
			link: 'https://finance.yahoo.com/news/tim-cook-spends-first-two-133404480.html?.tsrc=rss',
			date: 'Tue, 19 Nov 2018 13:34:04 +0000',
			title: '10 High-Tech Gifts That Cost Less Than $100'
		},
		{
			sentiment: 0,
			link: 'https://finance.yahoo.com/news/tim-cook-spends-first-two-133404480.html?.tsrc=rss',
			date: 'Tue, 19 Nov 2018 13:34:04 +0000',
			title: '10 High-Tech Gifts That Cost Less Than $100'
		},
		{
			sentiment: 10,
			link: 'https://finance.yahoo.com/news/tim-cook-spends-first-two-133404480.html?.tsrc=rss',
			date: 'Tue, 20 Nov 2018 13:34:04 +0000',
			title: '10 High-Tech Gifts That Cost Less Than $100'
		},
		{
			sentiment: 70,
			link: 'https://finance.yahoo.com/news/tim-cook-spends-first-two-133404480.html?.tsrc=rss',
			date: 'Tue, 21 Nov 2018 13:34:04 +0000',
			title: '10 High-Tech Gifts That Cost Less Than $100'
		}
	]
};

const articlesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_MOST_RECENT_ARTICLE:
			return {
				recentArticle: action.article,
				historicalArticles: state.historicalArticles
			};
		case SET_HISTORICAL_ARTICLES:
			return {
				recentArticle: state.recentArticle,
				historicalArticles: action.articles
			};

		default:
			return state;
	}
};

export default articlesReducer;
