const axios = require('axios');

//prefix request paths with
//   https://api.iextrading.com/1.0

const fetchStockPrice = async (company) => {
  let url = `https://api.iextrading.com/1.0/stock/${company}/price`;

  const articles = await axios.get(url);

  return articles.data
};

//fetchStockPrice(sampleCompany);

module.exports = fetchStockPrice
