//Ben's solution to the promise situation. Wrap entire file in async func
async function getArticleData(company, time) {
  //const fetchNews = require('./redditAPItest');
  const yahooNewsFetch = require('./yahooNewsFetch');
  const { getGoogleSentiment } = require('./getGoogleSentiment');

  //let testCompany = 'aapl'; //sample case

  //let time = new Date() - 6000000; //0000 //fetch current date and time

  let resultArray = [];

  //---------------------------------------------------------------
  //start fetching articles-------------------------
  let newArticles = await yahooNewsFetch(company, time);
  if (newArticles.length > 0) {
    //formate article into 1,000 chars---------------------------
    for (let i = 0; i < newArticles.length; i++) {
      //console.log(newArticles[0])
      let unit = newArticles[i].content.substring(0, 999);
      //---------------------------------------------------------------
      //send text to google for sentiment---------------------------v
      let sentimentResult = await getGoogleSentiment(unit);
      // console.log('returned from googlesent Func----', sentimentResult);
      //-------------------------------
      //put newArticles into storage--------------------------------
      let returnObject = {
        sentiment: sentimentResult,
        link: newArticles[i].link,
        date: newArticles[i].date,
      };
      resultArray.push(returnObject);
    }
    return resultArray
  } else {
    //console.log('no new articles ' + new Date());
  }

  // console.log(
  //   `${testCompany} stock price is $${currentPrice} at ${new Date(time)}`
  // );
  // console.log('------------------------------------------------');
}
//getArticleData(company)

module.exports = {
  getArticleData,
};
