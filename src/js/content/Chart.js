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

export default class Chart extends Component {
  render() {
    const historicalClosePrices = this.props.historicalClosePrices;
    const historicalArticlesArr = this.props.historicalArticlesArr.map(
      elem => elem.sentiment
    );

    let weekAxis = [];
    for (let i = 6; i >= 0; i--) {
      let date = new Date(new Date() - 86400000 * i);
      weekAxis.push(date.toString().slice(0, 15));
    }

    const data = {
      labels: weekAxis,
      datasets: [
        {
          label: 'Stock Price',
          type: 'line',
          data: historicalClosePrices,
          fill: false,
          borderColor: '#EC932F',
          backgroundColor: '#EC932F',
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          pointHoverBackgroundColor: '#EC932F',
          pointHoverBorderColor: '#EC932F',
          yAxisID: 'y-axis-1',
        },
        {
          type: 'line',
          label: 'Sentiment Rating',
          data: historicalArticlesArr,
          fill: false,
          backgroundColor: '#71B37C',
          borderColor: '#71B37C',
          hoverBackgroundColor: '#71B37C',
          hoverBorderColor: '#71B37C',
          yAxisID: 'y-axis-2',
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
        <h2>Mixed data Example</h2>
        <Line data={data} options={options} plugins={plugins} />

        {/* </canvas> */}
      </div>
    );
  }
}
