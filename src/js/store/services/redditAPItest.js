// const axios = require('axios');
// const { redditNewsAPI } = require('../secrets'); //this changed location :)

// const fetchNews = async (date, company) => {
//   let url = `https://newsapi.org/v2/everything?language=en&q=${company}&from=${date}&sortBy=publishedAt&apiKey=${
//     redditNewsAPI.key
//   }`;

//   const result = await axios.get(url);
//   let returnArray = [];

//   result.data.articles.forEach(article => {
//     if (new Date(article.publishedAt) > new Date(date)) {
//       returnArray.push({
//         title: article.title,
//         description: article.description,
//         content: article.content,
//         url: article.url,
//         publishedAt: article.publishedAt,
//       });
//     }
//   });
//   return returnArray;
// };

// module.exports = fetchNews;
