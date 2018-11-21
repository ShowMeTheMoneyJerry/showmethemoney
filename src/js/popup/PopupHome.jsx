import React from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
// import {getSession} from '..store/aliases'
// import aliases from '../store/aliases';

class PopupHome extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// this.props.getStockPrice('aapl');
		this.props.dispatch(getSession());
		console.log(this.props.prices);
	}
	render() {
		if (!this.props.prices) {
			return <div>fetch not work</div>;
		}
		return (
			<div>
				<h1>prices: {this.props.prices}</h1>
				<h1>count: {this.props.articles}</h1>
				<Button color="primary">Button M</Button>
				<Button color="primary">Button 2</Button>
			</div>
		);
	}
}

const mapState = (state) => ({
	count: state.articles,
	prices: state.prices
});

export default connect(mapState)(hot(module)(PopupHome));
