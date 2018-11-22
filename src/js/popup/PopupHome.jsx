import React from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
// import {getSession} from '..store/aliases'
// import aliases from '../store/aliases';
import {setCurrentPrice, fetchMostRecentPrice} from '../store/prices';

class PopupHome extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// this.props.dispatch({type: 'INCREMENT_PRICE'});
		this.props.setPrice(15);
		this.props.getPrice('aapl');
	}
	render() {
		if (!this.props.prices) {
			return <div>fetch not work</div>;
		}
		return (
			<div>
				<h1>prices: {this.props.prices}</h1>
				<h1>count: {this.props.articles.articles[0]}</h1>
				<Button color="primary">Button 1</Button>
				<Button color="primary">Button 2</Button>
			</div>
		);
	}
}

const mapState = (state) => ({
	articles: state.articles,
	prices: state.prices
});

const mapDispatch = (dispatch) => ({
	setPrice: (num) => dispatch(setCurrentPrice(num)),
	getPrice: (company) => dispatch(fetchMostRecentPrice(company))
});

export default connect(mapState, mapDispatch)(hot(module)(PopupHome));
