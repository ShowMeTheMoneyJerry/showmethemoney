import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {fetchCurrentStockPrice} from '../store';
import Chart from './Chart'


class GreetingComponent extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// setInterval(() => {
		//
		// }, 1000);
		// console.log('prrrroooops', this.props)
		 this.props.getStockPrice('aapl');
	}
	render() {
		// if (!this.props.prices) {
		// 	return <div>Oops, ehat broke it</div>;
		// }
		return (
			<div>
				<h1>This is articles test: {this.props.count}</h1>
				<h1>This is prices: {this.props.prices[(this.props.prices.length - 1)]}</h1>
				<p>this is a p tag</p>
				<Chart />
				<img src="https://i.imgur.com/7CXBltb.jpg" />
				<Button color="primary">Hello World!</Button>
				<Button color="primary">Don't Press</Button>
			</div>
		);
	}
}

const mapState = (state) => ({
	count: state.articles,
	prices: state.prices
});

const mapDispatch = (dispatch) => ({
	getStockPrice: (company) => dispatch(fetchCurrentStockPrice(company))
});

export default connect(mapState, mapDispatch)(hot(module)(GreetingComponent));

// export default connect(mapState, {fetchCurrentStockPrice})(hot(module)(GreetingComponent));

