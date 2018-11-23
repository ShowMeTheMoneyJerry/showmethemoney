//Action Types

const SET_DRAWER_STATE = "SET_DRAWER_STATE";

//Initial State

const initialState = {
  drawerOpen: false
};

//Action Creators
export const toggleDrawer = () => {
  return {
    type: SET_DRAWER_STATE
  };
};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DRAWER_STATE: {
      return {
        drawerOpen: !state.drawerOpen // whatever was the state before is gonna get changed, we only need the state to be updated
      };
    }
    default:
      return state;
  }
};
