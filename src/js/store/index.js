import { createStore, combineReducers, applyMiddleware } from "redux";
import { wrapStore } from "react-chrome-redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import articles from "./articles";
import prices from "./prices";
import ui from "./ui";

const reducer = combineReducers({
  articles,
  prices,
  ui
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

wrapStore(store, {
  portName: "MakesCents"
});
export default store;
export * from "./articles";
export * from "./prices";
export * from "./ui";
