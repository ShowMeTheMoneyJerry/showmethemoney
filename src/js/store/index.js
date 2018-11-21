import {createStore, combineReducers, applyMiddleware} from 'redux';
import {wrapStore, alias} from 'react-chrome-redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {aliases} from './aliases';
import articles from './articles';
import prices from './prices';

const reducer = combineReducers({
	articles,
	prices
});

// const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})));

// const store = createStore(reducer, middleware);
const store = createStore(reducer, applyMiddleware(alias(aliases), thunkMiddleware, createLogger({collapsed: true})));

wrapStore(store, {
	portName: 'MakesCents'
});

export default store;
export * from './articles';
export * from './prices';
