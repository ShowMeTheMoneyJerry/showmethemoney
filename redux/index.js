import { combineReducers } from 'redux'
import pricesReducer from './prices'

const appReducer = combineReducers({
  prices: pricesReducer,

})

export default appReducer
