import React from 'react';
import icon from '../../img/icon-128.png';
import {hot} from 'react-hot-loader';
// import {Button} from 'react-toolbox/lib/button';
import Button from '@material-ui/core/Button';

class GreetingComponent extends React.Component {
	render() {
		return (
			<div>
				<p>this is a p tag</p>
				<img src={icon} />
				<Button color="primary">Hwllo w</Button>
				<Button color="primary">hey juliaa</Button>
			</div>
		);
	}
}

export default hot(module)(GreetingComponent);
