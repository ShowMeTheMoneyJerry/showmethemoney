import axios from 'axios';

//prefix request paths with
//   https://api.iextrading.com/1.0

const fetchStockPrice = async (company) => {


  let url = `http://finance.yahoo.com/rss/headline?s=${company}`

  const articles = await axios.get(url);

  console.log(articles.data)
  return articles.data
};
let sampleCompany = 'aapl'
fetchStockPrice(sampleCompany);

module.exports = fetchPrice
