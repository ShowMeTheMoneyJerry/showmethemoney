const axios = require('axios');

//prefix request paths with
//   https://api.iextrading.com/1.0

const fetchStockPrice = async (company) => {
  let url = `https://api.iextrading.com/1.0/stock/${company}/news/last/10`;

  const articles = await axios.get(url);

  console.log(articles.data)
  return articles.data
};
let sampleCompany = 'aapl'
fetchStockPrice(sampleCompany);

module.exports = fetchPrice
