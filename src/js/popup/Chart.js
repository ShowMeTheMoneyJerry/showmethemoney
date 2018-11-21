import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchMostRecentPrice, fetchHistoricalPrices } from '../store';
import { connect } from 'react-redux';

const plugins = [
  {
    afterDraw: (chartInstance, easing) => {
      const ctx = chartInstance.chart.ctx;
      //ctx.fillText("This text drawn by a plugin", 100, 100);
    },
  },
];

class Chart extends Component {
  async componentDidMount() {
    // setInterval(async () => {
    // await this.props.getStockPrice('aapl');
    // console.log('prrrroooops', this.props.prices.recentPrice);
    await this.props.getHistoricalPrices('aapl');
    console.log(
      'are we getting historical prices?',
      this.props.prices.historicalPrices
    );
    // }, 1000);
  }

  render() {
    const data = {
      labels: this.props.prices,
      datasets: [
        {
          label: 'Stock Price',
          type: 'line',
          // data: stockData.map(day => {
          //          return day.close
          //         }),
          data: this.props.prices,
          fill: false,
          borderColor: '#EC932F',
          backgroundColor: '#EC932F',
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          pointHoverBackgroundColor: '#EC932F',
          pointHoverBorderColor: '#EC932F',
          yAxisID: 'y-axis-2',
        },
        {
          type: 'line',
          label: 'Sentiment Rating',
          data: [1],
          fill: false,
          backgroundColor: '#71B37C',
          borderColor: '#71B37C',
          hoverBackgroundColor: '#71B37C',
          hoverBorderColor: '#71B37C',
          yAxisID: 'y-axis-1',
        },
      ],
    };

    const options = {
      responsive: true,
      tooltips: {
        mode: 'label',
      },
      elements: {
        line: {
          fill: false,
        },
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false,
            },
            // labels: {
            //   show: true
            // }
          },
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: false,
            },
            // labels: {
            //   show: true
            // }
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: false,
            },
            // labels: {
            //   show: true
            // }
          },
        ],
      },
    };
    return (
      <div>
        {/* <canvas > */}
        <h2>Mixed data Example</h2>
        <Line data={data} options={options} plugins={plugins} />

        {/* </canvas> */}
      </div>
    );
  }
}

const mapState = state => ({
  prices: state.prices,
  articles: state.articles.historicalArticles,
});

const mapDispatch = dispatch => ({
  getStockPrice: company => dispatch(fetchMostRecentPrice(company)),
  getHistoricalPrices: (company, time) =>
    dispatch(fetchHistoricalPrices(company, time)),
});

export default connect(
  mapState,
  mapDispatch
)(Chart);
