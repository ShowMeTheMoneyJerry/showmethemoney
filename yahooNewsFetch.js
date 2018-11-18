const axios = require('axios');
const cheerio = require('cheerio');

const yahooNewsFetch = async (company, time) => {
  // fetch articles from yahoo ---------------------------
  let url = `http://finance.yahoo.com/rss/headline?s=${company}`;
  const fetchedArticles = await axios.get(url);
  // -----------------------------------------------------
  // initialize data storage -----------------------------
  const items = [];
  const dates = [];
  // -----------------------------------------------------
  // parse XML from rss feed -----------------------------
  const $ = await cheerio.load(fetchedArticles.data);
  // -----------------------------------------------------
  // extract each item && date from each item ------------
  $('item').each(function(i, elem) {
    items[i] = $(this).text();
    dates.push(
      $('pubDate')
        .eq(i)
        .text()
    );
  });
  // -----------------------------------------------------
  let parsedArticles = []
  // extract the link from each item ---------------------
  items.forEach((item, index) => {
    if ((new Date(dates[index])) > time) {
    let httpIndex = item.indexOf('https');
    let rssIndex = item.indexOf('rss');
    // push obj into parsed articles {link, date} ---
    parsedArticles.push( {
      link: item.slice(httpIndex, rssIndex + 3),
      date: dates[index],
    })
  }
    //-----------------------------------------------
    // -----------------------------------------------------
  });

    for (let i = 0; i < parsedArticles.length; i++) {
        let page = await axios.get(parsedArticles[i].link)
        const $$ = await cheerio.load(page.data)
        parsedArticles[i]['content'] = $$("article[itemprop = 'articleBody'] p").text()
    }

    //console.log(parsedArticles);

return parsedArticles
};

// let sampleCompany = 'aapl';
// yahooNewsFetch(sampleCompany, (new Date() - 60000000));

module.exports = yahooNewsFetch;
