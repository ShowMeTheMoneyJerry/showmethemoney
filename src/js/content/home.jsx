import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
// import {fetchCurrentStockPrice} from '../store';
import axios from 'axios';

class ContentHome extends Component {
	constructor(props) {
		super(props);

		this.fetchCurrentStockPrice = this.fetchCurrentStockPrice.bind(this);
	}

	////////////////////////////////////////////////// TEST TEST TEST
	async fetchCurrentStockPrice(company) {
		try {
			let url = `https://api.iextrading.com/1.0/stock/${company}/price`;
			const {data} = await axios.get(url);
			console.log('aapl stock price: ', data);

			this.props.dispatch({type: 'ADD_COUNT', data});
		} catch (error) {
			console.error(error);
		}
	}
	//////////////////////////////////////////////////

	componentDidMount() {
		// this.props.getStockPrice('aapl');
		// this.props.dispatch({type: 'ADD_COUNT'});
		this.fetchCurrentStockPrice('aapl');
	}
	render() {
		if (!this.props.prices) {
			return <div>Oops, we broke it</div>;
		}
		// console.log(this.props.prices);
		return (
			<div>
				{/* <h1>This is count test: {this.props.count}</h1>
				<h1>This is prices: {this.props.prices}</h1>
				<img src="https://i.imgur.com/7CXBltb.jpg" />
				<Button color="primary">Hello World!</Button>
				<Button color="primary">Don't Press</Button> */}
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

export default connect(mapState)(hot(module)(ContentHome));
