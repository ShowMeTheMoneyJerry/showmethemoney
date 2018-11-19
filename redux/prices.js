const axios = require('axios');



// Action Types
const SET_CURRENT_PRICE = 'SET_CURRENT_PRICE';
// Action Creators
export const setCurrentPrice = price => ({
  type: SET_CURRENT_PRICE,
  price,
});
// Thunk Creator
export const fetchCurrentStockPrice = (company) => async dispatch => {
  try {
    let url = `https://api.iextrading.com/1.0/stock/${company}/price`;
    const {data: price} = await axios.get(url);

    dispatch(setCurrentPrice(price))

    //return price.data;
  } catch (error) {
    console.error(error)
  }
};


// Reducer

const initialState = {
  currentPrice: {},
  // allPrices: []
};

const pricesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PRICE:
      return { ...state, currentPrice: action.price };
    default:
      return state;
  }
};

export default pricesReducer;
