import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import articles from './articles';
import {wrapStore} from 'react-chrome-redux';

const reducer = combineReducers({
	articles
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})));
const store = createStore(reducer, middleware);

wrapStore(store, {
	portName: 'MakesCents'
});
export default store;
export * from './articles';
