//Ben's solution to the promise situation. Wrap entire file in async func
async function getCompanyData(company) {
//const fetchNews = require('./redditAPItest');
const fetchStockPrice = require('./iexStockFetch');
const yahooNewsFetch = require('./yahooNewsFetch');
const {getGoogleSentiment} = require('./getGoogleSentiment')
// Imports the Google Cloud client library
//const language = require('@google-cloud/language');
let testCompany = 'aapl'; //sample case
let currentPrice = 0; //storage for current price
let articles = []; //storage for all articles fetched
let currentArticle = [];
let averageSentiment = 0;

//initialize Google sentiment client and variables---------------
// const client = new language.LanguageServiceClient({
//   projectId: 'you-send-me-arti-1542168204862',
//   keyFilename: '4b1a139bea39.json',
// });




//---------------------------------------------------------------
//start fetching articles && stock price-------------------------
let requestLoop = setInterval(async function() {

  currentPrice = await fetchStockPrice(testCompany); //fetch current price
  let time = new Date() - 6000000; //0000 //fetch current date and time
  /////////let newArticles = await fetchNews(time, company); //fetch any new articles
  let newArticles = await yahooNewsFetch(testCompany, time);

  // create {
  //   Sentiment,
  //   date,
  //   title,
  //   url
  // }

  if (newArticles.length > 0) {
    //formate article into 1,000 chars---------------------------
    for (let i = 0; i < newArticles.length; i++) {
      //console.log(newArticles[0])
      let unit = newArticles[i].content.substring(0, 999);
      //---------------------------------------------------------------
      //send text to google for sentiment---------------------------v
      let result = await getGoogleSentiment(unit)
      console.log('returned from googlesent Func----', result)
    //-------------------------------
    //put newArticles into storage--------------------------------
    articles = [...articles, ...newArticles];
    //------------------------------------------------------------
    }
  } else {
    console.log('no new articles ' + new Date());
  }

  console.log(
    `${testCompany} stock price is $${currentPrice} at ${new Date(time)}`
  );
  console.log('------------------------------------------------');
  return resultObject

}, 1000);


}
getCompanyData(company)

// module.exports = {
//   getCompanyData
// }
