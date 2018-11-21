import {createStore, combineReducers, applyMiddleware} from 'redux';
import {alias, wrapStore} from 'react-chrome-redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import prices from './prices';

const reducer = combineReducers({
	prices
});

const aliases = {
	// this key is the name of the action to proxy, the value is the action
	// creator that gets executed when the proxied action is received in the
	// background
	'user-clicked-alias': () => {
		// this call can only be made in the background script
		chrome.notifications.create();
	}
};

const middleware = composeWithDevTools(
	applyMiddleware(alias(aliases), thunkMiddleware, createLogger({collapsed: true}))
);

const store = createStore(reducer, middleware);

wrapStore(store, {
	portName: 'MakesCents'
});
export default store;
export * from './prices';
