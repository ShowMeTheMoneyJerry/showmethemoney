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
    // 7 days x-axis including today
    let weekAxis = [];
    for (let i = 6; i >= 0; i--) {
      let date = new Date(new Date() - 86400000 * i);
      weekAxis.push(date.toUTCString().slice(0, 16));
    }

    // for price data-----------------------------------
    const dateFilteredPrices = this.props.historicalPricesArr.filter(elem =>
      weekAxis.includes(new Date(elem.date).toUTCString().slice(0, 16))
    );

    // --> pricesData format will be {x: "Fri, 16 Nov 2018", y: 153.25}
    let pricesData = [];
    for (let i = 0; i < dateFilteredPrices.length; i++) {
      let obj = {};
      const formattedDate = new Date(dateFilteredPrices[i].date)
        .toUTCString()
        .slice(0, 16);
      obj.x = formattedDate;
      obj.y = dateFilteredPrices[i].close;
      pricesData.push(obj);
    }
    pricesData.unshift({ labels: weekAxis });

    // for sentiment data-----------------------------------
    const dateFilteredSentiment = this.props.historicalArticlesArr.filter(
      elem => weekAxis.includes(new Date(elem.date).toUTCString().slice(0, 16))
    );

    // --> sentimentData format will be {x: "Fri, 16 Nov 2018", y: 10}
    const sentimentData = [];
    for (let i = 0; i < dateFilteredSentiment.length; i++) {
      let obj = {};
      const formattedDate = new Date(dateFilteredSentiment[i].date)
        .toUTCString()
        .slice(0, 16);
      obj.x = formattedDate;
      obj.y = dateFilteredSentiment[i].sentiment;
      sentimentData.push(obj);
    }
    sentimentData.unshift({ labels: sentimentData.map(elem => elem.x) });
    console.log('pricesData', pricesData);
    console.log('sentimentData', sentimentData);

    // issue 1: 특정 x-axis에 해당하는 값이 없는 경우에 어떻게 할 것인지
    // 그게 x-axis 중간이면 그냥 두 점을 알아서 이어줌.
    // issue 2: average sentiment로 바꿔야 함. 안그럼 두점이 이어져서 찍힘. daily average sentiment를
    // 어디에서 계산해서 어떻게 저장할 것인지 정해야 함.

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
        {/* <h2>Mixed data Example</h2> */}
        <Line data={data} options={options} plugins={plugins} />

        {/* </canvas> */}
      </div>
    );
  }
}
