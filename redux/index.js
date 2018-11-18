import { createStore, combineReducers, applyMiddleware } from 'redux'
import pricesReducer from './prices'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

const appReducer = combineReducers({
  prices: pricesReducer,

})

const store = createStore(appReducer, middleware)


export default store
