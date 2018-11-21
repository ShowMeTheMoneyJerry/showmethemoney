import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { fetchMostRecentPrice, fetchHistoricalPrices} from '../store';
// import Chart from './Chart'

class GreetingComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // setInterval(() => {
    //
    // }, 1000);
    // console.log('prrrroooops', this.props)
    this.props.getHistoricalPrices('aapl', '5d');
  }
  render() {
    if (this.props.prices.recentPrice === undefined) {
      return <div>Oops, ehat broke it</div>;
    }
    console.log('this.props.prices--->', this.props.prices.historicalPrices.map(el => {
			return el.close
		}));
    return (
      <div>
        {/* <h1>This is articles test: {this.props.count}</h1> */}
        <h1>This is prices: {this.props.prices.historicalPrices.map(el => {
					return el.close
				})}</h1>
        <p>this is a p tag</p>
        {/* <Chart /> */}
        <img src="https://i.imgur.com/7CXBltb.jpg" />
        <Button color="primary">Hello World!</Button>
        <Button color="primary">Don't Press</Button>
      </div>
    );
  }
}

const mapState = state => ({
  count: state.articles,
  prices: state.prices,
});

const mapDispatch = dispatch => ({
	getMostRecentPrice: company => dispatch(fetchMostRecentPrice(company)),
	getHistoricalPrices: (company, time) => dispatch(fetchHistoricalPrices(company, time)),
});

export default connect(
  mapState,
  mapDispatch
)(hot(module)(GreetingComponent));

// export default connect(mapState, {fetchCurrentStockPrice})(hot(module)(GreetingComponent));
