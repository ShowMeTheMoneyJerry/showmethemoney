// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient(
	{
		// projectId: 'you-send-me-arti-1542168204862',
		// keyFilename: 'b299ec4276d3.json'
	}
);

// The text to analyze
const text = 'Hello, world!';

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

// 	// Imports the Google Cloud client library.
// const {Storage} = require('@google-cloud/storage');

// // Instantiates a client. Explicitly use service account credentials by
// // specifying the private key file. All clients in google-cloud-node have this
// // helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// const storage = new Storage({
//   projectId: 'project-id',
//   keyFilename: '/path/to/keyfile.json'
// });

// // Makes an authenticated API request.
// storage
//   .getBuckets()
//   .then((results) => {
//     const buckets = results[0];

//     console.log('Buckets:');
//     buckets.forEach((bucket) => {
//       console.log(bucket.name);
//     });
//   })
//   .catch((err) => {
//     console.error('ERROR:', err);
// 	});
