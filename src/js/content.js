console.log('Syringe it up from content.js!');

import ContentHome from './content/home.jsx';
import React from 'react';
import {render} from 'react-dom';
import {Store, applyMiddleware} from 'react-chrome-redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import store from './store';

const proxyStore = new Store({
	portName: 'MakesCents'
});

// Apply middleware to proxy store
const storeWithMiddleware = applyMiddleware(proxyStore, thunkMiddleware, createLogger({collapsed: true}));

// You can now dispatch a function from the proxy store
storeWithMiddleware.dispatch((dispatch, getState) => {
	// Regular dispatches will still be routed to the background
	// dispatch({type: 'start-async-action'});
});

// This anchor is what we use to inject code into the browser
const anchor = document.createElement('nav');
anchor.id = 'app';
window.document.body.prepend(anchor);

proxyStore.ready().then(() => {
	// The store implements the same interface as Redux's store
	// so you can use tools like `react-redux` no problem!
	render(
		<Provider store={proxyStore}>
			<ContentHome />
		</Provider>,
		window.document.getElementById('app')
	);
});
