//Ben's solution to the promise situation. Wrap entire file in async func
//async function getCompanyData() {
const fetchNews = require('./redditAPItest');
const fetchStockPrice = require('./iexStockFetch');
const yahooNewsFetch = require('./yahooNewsFetch');
// Imports the Google Cloud client library
const language = require('@google-cloud/language');

let company = 'aapl'; //sample case
let currentPrice = 0; //storage for current price
let articles = []; //storage for all articles fetched
let currentArticle = [];
let averageSentiment = 0;

//initialize Google sentiment client and variables---------------
const client = new language.LanguageServiceClient({
  projectId: 'you-send-me-arti-1542168204862',
  keyFilename: '4b1a139bea39.json',
});
let text = 'sad sad sad sad ';
const document = {
  content: text,
  type: 'PLAIN_TEXT',
};
//---------------------------------------------------------------
//start fetching articles && stock price-------------------------
let requestLoop = setInterval(async function() {
  currentPrice = await fetchStockPrice(company); //fetch current price
  let time = new Date() - 6000; //0000 //fetch current date and time
  /////////let newArticles = await fetchNews(time, company); //fetch any new articles
  let newArticles = await yahooNewsFetch(company, time);
  if (newArticles.length > 0) {
    //formate article into 1,000 chars---------------------------

    let unit = newArticles[0].content.substring(0, 999);
    text = unit;
    //---------------------------------------------------------------
    //send text to google for sentiment---------------------------
    client
      .analyzeSentiment({ document: document })
      .then(results => {
        const sentiment = results[0].documentSentiment;

        console.log(`Text: ${text}`);
        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
      })
      //------------------------------------------------------------
      //ERROR handling-----------------
      .catch(err => {
        console.error('ERROR:', err);
      });
    //-------------------------------
    //put newArticles into storage--------------------------------
    articles = [...articles, ...newArticles];
    //------------------------------------------------------------
  } else {
    console.log('no new articles ' + new Date());
  }

  console.log(
    `${company} stock price is $${currentPrice} at ${new Date(time)}`
  );
  console.log('------------------------------------------------');
}, 6000);



// module.exports = {
//   getCompanyData
// }
