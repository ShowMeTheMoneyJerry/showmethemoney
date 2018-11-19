import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

class GreetingComponent extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		setInterval(() => {
			this.props.dispatch({
				type: 'ADD_COUNT'
			});
		}, 1000);
	}
	render() {
		return (
			<div>
				<h1>This is an h1 tag: {this.props.count}</h1>
				<p>this is a p tag</p>
				<img src="https://i.imgur.com/7CXBltb.jpg" />
				<Button color="primary">Hello World!</Button>
				<Button color="primary">Don't Press</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	count: state.articles
});

// const mapDispatchToProps = (dispatch) => ({
// 	loadOrder: (orderId) => dispatch(fetchOrder(orderId))
// });

export default connect(mapStateToProps)(GreetingComponent);
// hot(module)
