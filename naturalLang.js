//Ben's solution to the promise situation. Wrap entire file in async func
async function google () {
const run = require('./ryanDev/redditAPItest');

// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient({
	projectId: 'you-send-me-arti-1542168204862',
	keyFilename: '4b1a139bea39.json'
});

let text = ''

await run()
	.then((data) => data.articles[1].description)
	.then((description) => {
		text = text + description
	});
//console.log(text);

const document = {
	content: text,
	type: 'PLAIN_TEXT'
};

// Detects the sentiment of the text
client
	.analyzeSentiment({document: document})
	.then((results) => {
		const sentiment = results[0].documentSentiment;

		console.log(`Text: ${text}`);
		console.log(`Sentiment score: ${sentiment.score}`);
		console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
	})
	.catch((err) => {
		console.error('ERROR:', err);
	});
}
//call the function at the end
google()
