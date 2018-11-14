const request = require('request')
const { redditNewsAPI } = require('../secrets')

// var url = 'https://newsapi.org/v2/top-headlines?' +
//           'country=us&' +
//           `apiKey=${redditNewsAPI.key}`;


var url = `https://newsapi.org/v2/everything?q=apple&from=2018-11-13&to=2018-11-13&sortBy=popularity&apiKey=${redditNewsAPI.key}`


// var req = new Request(url);
// fetch(req)
//     .then(function(response) {
//         console.log(response.json());
//     })

// let newsData = {}

request(url, function (err, res, body) {
    console.log('error:', err)
    console.log('statusCode:', res && res.statusCode)
    console.log('body:', JSON.parse(body));
   // newsData = (Object.assign(newsData, JSON.parse(body)))


})


// console.log(newsData)
