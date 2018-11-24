console.log('Here comes popup.js!');
import '../css/popup.css';
import PopupHome from './popup/PopupHome.jsx';
import React from 'react';
import {render} from 'react-dom';
import {Store, applyMiddleware} from 'react-chrome-redux';
import {Provider} from 'react-redux';

import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const proxyStore = new Store({
	portName: 'MakesCents'
});

// Apply middleware to proxy store
export const storeThunker = applyMiddleware(proxyStore, thunkMiddleware, createLogger({collapsed: true}));

// You can now dispatch a function from the proxy store
storeThunker.dispatch((dispatch, getState) => {
	// Regular dispatches will still be routed to the background
	// dispatch({type: 'start-async-action'});
	// dispatch({type: 'INCREMENT_PRICE'});
});

proxyStore.ready().then(() => {
	render(
		<Provider store={proxyStore}>
			<PopupHome />
		</Provider>,
		window.document.getElementById('app')
	);
});
