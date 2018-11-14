let output = {};
const axios = require('axios');
const {redditNewsAPI} = require('../secrets');

var url = `https://newsapi.org/v2/everything?q=apple&from=2018-11-13&to=2018-11-13&sortBy=popularity&apiKey=${redditNewsAPI.key}`;

const run = async () => {
	const result = await axios.get(url);
	return result.data;
};

module.exports = run;
