import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';

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
    const { historicalPricesArr, sentimentValue } = this.props;
    const { recentPrice } = this.props;
    // 7 days x-axis including today
    let weekAxis = [];
    for (let i = 6; i >= 0; i--) {
      let date = new Date(new Date() - 86400000 * i);
      weekAxis.push(date.toUTCString().slice(0, 16));
    }

    // for price data-----------------------------------
    const dateFilteredPrices = historicalPricesArr.filter(elem =>
      weekAxis.includes(new Date(elem.date).toUTCString().slice(0, 16))
    );

    // ---- pricesData format looks like this --> {x: "Fri, 16 Nov 2018", y: 153.25}
    let pricesData = [];
    for (let i = 0; i < dateFilteredPrices.length; i++) {
      let obj = {};
      const formattedDate = new Date(dateFilteredPrices[i].date)
        .toUTCString()
        .slice(0, 16);
      obj.x = formattedDate;
      obj.y = dateFilteredPrices[i].close;

      // adding the previous day's price to the beginning of the graph
      if (i === 0 && formattedDate !== weekAxis[0]) {
        let addingObj = {};
        const dateModifiedPricesArr = historicalPricesArr.map(elem =>
          new Date(elem.date).toUTCString().slice(0, 16)
        );
        const addingPrice =
          historicalPricesArr[dateModifiedPricesArr.indexOf(formattedDate) - 1];
        addingObj.x = weekAxis[0];
        addingObj.y = addingPrice.close;
        pricesData.push(addingObj);
      }

      pricesData.push(obj);

      // adding most recent price to the end of the graph
      const today = new Date().toUTCString().slice(0, 16);
      if (i === dateFilteredPrices.length - 1) {
        if (!recentPrice) {
          const valueToAdd = pricesData[pricesData.length - 1].y;
          pricesData.push({ x: today, y: valueToAdd });
        } else {
          pricesData.push({ x: today, y: recentPrice });
        }
      }
    }

    pricesData.unshift({ labels: pricesData.map(elem => elem.x) });

    // for sentiment data-----------------------------------

    sentimentValue.sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.date) - new Date(b.date);
    });
    const dateFilteredSentiment = sentimentValue.filter(elem =>
      weekAxis.includes(elem.date)
    );

    // ---- sentimentData format looks like this --> {x: "Fri, 16 Nov 2018", y: 10}
    const sentimentData = [];
    for (let i = 0; i < dateFilteredSentiment.length; i++) {
      let obj = {};
      obj.x = dateFilteredSentiment[i].date;
      obj.y = dateFilteredSentiment[i].value;

      if (dateFilteredSentiment[0].date !== weekAxis[0]) {
        let addingObj = {};
        const dateOnlySentArr = sentimentValue.map(elem => elem.date);
        const addingSentiment =
          sentimentArr[
            dateOnlySentArr.indexOf(dateFilteredSentiment[0].date) - 1
          ];
        addingObj.x = weekAxis[0];
        addingObj.y = addingSentiment.value;
        pricesData.push(addingObj);
      }
      sentimentData.push(obj);
    }

    sentimentData.unshift({ labels: sentimentData.map(elem => elem.x) });

    console.log('weekAxis', weekAxis);
    console.log('pricesData', pricesData);
    console.log('sentimentData', sentimentData);

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
        <Line
          data={data}
          width={500}
          height={300}
          options={options}
          plugins={plugins}
        />
        <Button
          onClick={() => {
            this.props.onBackButtonClick();
          }}
        >
          Home
        </Button>
      </div>
    );
  }
}
