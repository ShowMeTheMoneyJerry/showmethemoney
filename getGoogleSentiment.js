// Imports the Google Cloud client library
const language = require('@google-cloud/language')

// //initialize Google sentiment client and variables---------------
const client = new language.LanguageServiceClient({
  projectId: 'you-send-me-arti-1542168204862',
  keyFilename: '4b1a139bea39.json',
});

const getGoogleSentiment = async (text) => {
  //let newSentiment;
  //let text = 'sad sad sad sad ';
  const document = {
    //content: text, 'sad, sad, sad'

    content: text,
    type: 'PLAIN_TEXT',
  };

  //send text to google for sentiment---------------------------
  try {
    let result = await client.analyzeSentiment({ document: document })
    let sentiment = result[0].documentSentiment
    // console.log('sentiment ------------------', sentiment);
    // console.log(`Text: ${text}`);
    // console.log(`Sentiment score: ${sentiment.score}`);
    // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    return sentiment
  } catch (error) {
    console.error(error)
  }
};

//for testing---------------------------
// let text = 'sad sad sad sad ';
// const document = {
//   content: text,
//   type: 'PLAIN_TEXT',
// };
//getGoogleSentiment(document)

module.exports = {
  getGoogleSentiment
}
