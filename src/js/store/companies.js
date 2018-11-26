import axios from "axios";

// Action Types
export const SET_COMPANY = "SET_COMPANY";
export const ADD_COMPANY = "ADD_COMPANY";
export const REMOVE_COMPANY = "REMOVE_COMPANY";

// Action Creators
export const removeCompany = comp => ({
  type: "REMOVE_COMPANY",
  comp
});

export const setCompany = comp => ({
  type: "SET_COMPANY",
  comp
});

export const addCompany = comp => ({
  type: "ADD_COMPANY",
  comp
});

// Reducer
const initialState = {
  currentCompany: "",
  allCompanies: ["aapl", "googl", "msft"]
};

const companies = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANY:
      return {
        currentCompany: action.comp,
        allCompanies: state.allCompanies
      };
    case ADD_COMPANY:
      return {
        currentCompany: state.currentCompany,
        allCompanies: state.allCompanies.push(action.comp)
      };
    case REMOVE_COMPANY:
      return {
        currentCompany: state.currentCompany,
        allCompanies: state.allCompanies.filter(comp => comp !== action.comp)
      };
    default:
      return state;
  }
};

export default companies;
