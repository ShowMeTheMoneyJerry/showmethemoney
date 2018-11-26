import {createStore, combineReducers, applyMiddleware} from 'redux';
import {wrapStore, alias} from 'react-chrome-redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {aliases} from './aliases';
import articlesReducer from './articles';
// import pricesReducer from './prices';
import companiesReducer from './companies';

const reducer = combineReducers({
	articles: articlesReducer,
	// prices: pricesReducer,
	companies: companiesReducer
});

// const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})));

// const store = createStore(reducer, middleware);
const store = createStore(reducer, applyMiddleware(alias(aliases), thunkMiddleware, createLogger({collapsed: true})));

wrapStore(store, {
	portName: 'MakesCents'
});

export default store;
export * from './articles';
// export * from './prices';
export * from './companies';
