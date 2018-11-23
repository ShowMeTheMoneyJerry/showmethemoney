import React, { Component, forwardRef } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

const plugins = [
  {
    afterDraw: (chartInstance, easing) => {
      const ctx = chartInstance.chart.ctx;
      //ctx.fillText("This text drawn by a plugin", 100, 100);
    },
  },
];

export default class Chart extends Component {
  render() {
    let weekAxis = [];
    for (let i = 6; i >= 0; i--) {
      let date = new Date(new Date() - 86400000 * i);
      weekAxis.push(date.toUTCString().slice(0, 16));
    }

    const historicalClosePrices = this.props.historicalPricesArr.map(
      el => el.close
    );

    const historicalPricesDate = this.props.historicalPricesArr.map(el =>
      new Date(el.date).toUTCString().slice(0, 16)
    );

    const pricesData = [];
    for (let i = 0; i < historicalClosePrices.length; i++) {
      let obj = {};
      obj.x = historicalPricesDate[i];
      obj.y = historicalClosePrices[i];
      pricesData.push(obj);
    }
    pricesData.shift({ labels: weekAxis });
    console.log('pricesData-->', pricesData);

    const historicalSentimentArr = this.props.historicalArticlesArr.map(
      elem => elem.sentiment
    );

    const historicalSentimentDate = this.props.historicalArticlesArr.map(elem =>
      new Date(elem.date).toUTCString().slice(0, 16)
    );

    const sentimentData = [];
    for (let i = 0; i < historicalSentimentDate.length; i++) {
      let obj = {};
      obj.x = historicalSentimentDate[i];
      obj.y = historicalSentimentArr[i];
      sentimentData.push(obj);
    }
    sentimentData.shift({ labels: weekAxis });
    console.log('sentimentData-->', sentimentData);
    // {x: "10:00", y: 127}

    const data = {
      labels: weekAxis,
      datasets: [
        {
          label: 'Stock Price',
          type: 'line',
          data: pricesData,
          fill: false,
          borderColor: '#EC932F',
          backgroundColor: '#EC932F',
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          pointHoverBackgroundColor: '#EC932F',
          pointHoverBorderColor: '#EC932F',
          yAxisID: 'y-axis-1',
          xAxisId: 'x-axis',
        },
        {
          type: 'line',
          label: 'Sentiment Rating',
          data: sentimentData,
          fill: false,
          backgroundColor: '#71B37C',
          borderColor: '#71B37C',
          hoverBackgroundColor: '#71B37C',
          hoverBorderColor: '#71B37C',
          yAxisID: 'y-axis-2',
          xAxisId: 'x-axis',
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
            id: 'x-axis',
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
            ticks: {
              max: 100,
              min: -100,
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
        {/* <h2>Mixed data Example</h2> */}
        <Line data={data} options={options} plugins={plugins} />

        {/* </canvas> */}
      </div>
    );
  }
}
