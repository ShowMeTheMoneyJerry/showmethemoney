import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import Button from '@material-ui/core/Button';

class GreetingComponent extends Component {
	constructor() {
		super();
		this.state = {
			count: 0
		};
	}

	componentDidMount() {
		setInterval(() => {
			this.setState({
				count: this.state.count + 1
			});
		}, 1000);
	}
	render() {
		return (
			<div>
				<h1>This is an h1 tag: {this.state.count}</h1>
				<p>this is a p tag</p>
				<img src="https://i.imgur.com/7CXBltb.jpg" />
				<Button color="primary">Hello World!</Button>
				<Button color="primary">Don't Press</Button>
			</div>
		);
	}
}

export default hot(module)(GreetingComponent);
