import {createStore, combineReducers, applyMiddleware} from 'redux';
import {wrapStore} from 'react-chrome-redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import articles from './articles';
import prices from './prices';

const reducer = combineReducers({
	articles,
	prices
});

// const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})));

// const store = createStore(reducer, middleware);
const store = createStore(reducer);

wrapStore(store, {
	portName: 'MakesCents'
});

export default store;
export * from './articles';
export * from './prices';
