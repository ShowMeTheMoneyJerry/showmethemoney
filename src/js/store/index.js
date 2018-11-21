import { createStore, combineReducers, applyMiddleware } from 'redux';
import { wrapStore } from 'react-chrome-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import articlesReducer from './articles';
import pricesReducer from './prices';

const reducer = combineReducers({
  articles: articlesReducer,
  prices: pricesReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

wrapStore(store, {
  portName: 'MakesCents',
});

export default store;
export * from "./articles";
export * from "./prices";
