import '../css/popup.css';
import PopupHome from './popup/PopupHome.jsx';
import React from 'react';
import {render} from 'react-dom';
import {Store, applyMiddleware} from 'react-chrome-redux';
import {Provider} from 'react-redux';

import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const proxyStore = new Store({
	portName: 'MakesCents'
});

const middleware = composeWithDevTools(thunkMiddleware, createLogger({collapsed: true}));

// Apply middleware to proxy store
const storeWithMiddleware = applyMiddleware(proxyStore, middleware);

// You can now dispatch a function from the proxy store
storeWithMiddleware.dispatch((dispatch, getState) => {
	// Regular dispatches will still be routed to the background
	dispatch({type: 'start-async-action'});
	setTimeout(() => {
		dispatch({type: 'complete-async-action'});
	}, 0);
});

proxyStore.ready().then(() => {
	render(
		<Provider store={proxyStore}>
			<PopupHome />
		</Provider>,
		window.document.getElementById('app')
	);
});
