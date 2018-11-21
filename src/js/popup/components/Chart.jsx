import React from "react";
import { Line, Bar } from "react-chartjs-2";

// var Chart = require("chart.js");
// let LineChart = require("react-chartjs-2").Line;
//comment
class Chart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="chart">
        <Line data={data} width={100} height={50} options />
      </div>
    );
  }
}

export default Chart;
