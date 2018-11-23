//Ben's solution to the promise situation. Wrap entire file in async func
//const fetchNews = require('./redditAPItest');
const {yahooNewsFetch} = require('./yahooNewsFetch');
// const { getGoogleSentiment } = require('./getGoogleSentiment');

const getArticleData = async (company, time) => {
	//let testCompany = 'aapl'; //sample case

	//let time = new Date() - 6000000; //0000 //fetch current date and time

	let resultArray = [];

	//---------------------------------------------------------------
	//start fetching articles-------------------------
	console.log('hi');
	let newArticles = await yahooNewsFetch(company, time);
	//let newArticles = await yahooNewsFetch('aapl', 60000000);

	if (newArticles.length > 0) {
		//formate article into 1,000 chars---------------------------
		for (let i = 0; i < newArticles.length; i++) {
			console.log(newArticles[i]);
			let unit = newArticles[i].content.substring(0, 999);
			//---------------------------------------------------------------
			//send text to google for sentiment---------------------------v
			//********************************
			//format sentimentResult from decimal (-1 to 1) to number (-100 to 100)
			// let sentimentResult = await getGoogleSentiment(unit); //FIX NEEDED
			let sentimentScore = 1; //<------- Put this variable here ----->Math.floor(sentimentResult.score * 100);
			//********************************

			// console.log('returned from googlesent Func----', sentimentResult);
			//-------------------------------
			//put newArticles into storage--------------------------------
			let returnObject = {
				sentiment: sentimentScore,
				link: newArticles[i].link,
				date: newArticles[i].date,
				title: newArticles[i].title
			};
			resultArray.push(returnObject);
		}
		return resultArray;
	} else {
		console.log('no new articles ' + new Date());
	}

	// console.log(
	//   `${testCompany} stock price is $${currentPrice} at ${new Date(time)}`
	// );
	// console.log('------------------------------------------------');
};
//getArticleData(company)

// module.exports = {
//   getArticleData,
// }
getArticleData('aapl', 600000);
//export default getArticleData;
