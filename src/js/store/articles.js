import axios from 'axios';

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

export const fetchHistoricalArticles = (company, time) => async (dispatch) => {
	try {
		let url = `https://makescents.herokuapp.com/${company}/${time}`;
		const {data} = await axios.get(url);

		console.log('data', data);
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
			date: 'Thu, 15 Nov 2018 13:34:04 +0000',
			title: '10 High-Tech Gifts That Cost Less Than $100'
		},
		{
			sentiment: 40,
			link: 'https://finance.yahoo.com/news/tim-cook-spends-first-two-133404480.html?.tsrc=rss',
			date: 'Fri, 16 Nov 2018 13:34:04 +0000',
			title: '10 High-Tech Gifts That Cost Less Than $100'
		},
		{
			sentiment: 10,
			link: 'https://finance.yahoo.com/news/tim-cook-spends-first-two-133404480.html?.tsrc=rss',
			date: 'Sat, 17 Nov 2018 13:34:04 +0000',
			title: '10 High-Tech Gifts That Cost Less Than $100'
		},
		{
			sentiment: -10,
			link: 'https://finance.yahoo.com/news/tim-cook-spends-first-two-133404480.html?.tsrc=rss',
			date: 'Mon, 19 Nov 2018 13:34:04 +0000',
			title: '10 High-Tech Gifts That Cost Less Than $100'
		},
		{
			sentiment: -20,
			link: 'https://finance.yahoo.com/news/tim-cook-spends-first-two-133404480.html?.tsrc=rss',
			date: 'Mon, 19 Nov 2018 13:34:04 +0000',
			title: '10 High-Tech Gifts That Cost Less Than $100'
		},
		{
			sentiment: -50,
			link: 'https://finance.yahoo.com/news/tim-cook-spends-first-two-133404480.html?.tsrc=rss',
			date: 'Tue, 20 Nov 2018 13:34:04 +0000',
			title: '10 High-Tech Gifts That Cost Less Than $100'
		},
		{
			sentiment: -60,
			link: 'https://finance.yahoo.com/news/tim-cook-spends-first-two-133404480.html?.tsrc=rss',
			date: 'Wed, 21 Nov 2018 13:34:04 +0000',
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
