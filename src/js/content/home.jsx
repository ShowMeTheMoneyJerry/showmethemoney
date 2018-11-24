import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {fetchMostRecentPrice, fetchHistoricalPrices} from '../store';

class ContentHome extends Component {
	componentDidMount() {
		this.props.getHistoricalPrices('aapl', '5d');
		this.props.getMostRecentPrice('aapl');
	}
	render() {
		if (this.props.prices.recentPrice === undefined) {
			return <div>Oops, what broke it</div>;
		}

		const historicalPrices = this.props.prices.historicalPrices;
		const recentPrice = this.props.prices.recentPrice;
		const historicalArticles = this.props.articles.historicalArticles;
		console.log('mostRecentPrice', recentPrice);
		return (
			<div>
				{/* <h1>This is articles test: {this.props.count}</h1> */}
				{/* <h1>This is prices: {historicalPrices}</h1> */}
				{/* <p>this is a p tag</p> */}
				{/* <Chart
          historicalPricesArr={historicalPrices}
          historicalArticlesArr={historicalArticles}
          recentPrice={recentPrice}
        /> */}
				{/* <Button color="primary">Hello World!</Button> */}
			</div>
		);
	}
}

const mapState = (state) => ({
	articles: state.articles,
	prices: state.prices
});

const mapDispatch = (dispatch) => ({
	getMostRecentPrice: (company) => dispatch(fetchMostRecentPrice(company)),
	getHistoricalPrices: (company, time) => dispatch(fetchHistoricalPrices(company, time))
});

export default connect(mapState, mapDispatch)(ContentHome);

// export default connect(mapState, {fetchCurrentStockPrice})(hot(module)(GreetingComponent));
