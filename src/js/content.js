console.log('Hey Ben! content.js is working!');

import '../css/popup.css';
import Greeting from './content/home.jsx';
import React from 'react';
import {render} from 'react-dom';
import {Store} from 'react-chrome-redux';
import {Provider} from 'react-redux';

const proxyStore = new Store({
	portName: 'MakesCents'
});

const anchor = document.createElement('div');
anchor.id = 'apple';

window.document.body.prepend(anchor);

render(
	<Provider store={proxyStore}>
		<Greeting />
	</Provider>,
	window.document.getElementById('apple')
);
