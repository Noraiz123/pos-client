import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.customers, action) => {
  switch (action.type) {
    case actionTypes.getCustomers: {
      return { ...state, allCustomers: action.payload.customers };
    }
    case actionTypes.currentCustomer: {
      return { ...state, currentCustomer: action.payload };
    }
    case actionTypes.createCustomer: {
      return { ...state, allCustomers: state.allCustomers.concat(action.payload), currentCustomer: action.payload };
    }
    case actionTypes.deleteCustomer: {
      return { ...state, allCustomers: action.payload.customers };
    }
    case actionTypes.updateCustomer: {
      return { ...state, allCustomers: state.allCustomers.map((e) => (e.id === action.payload.id ? action.payload : e)) };
    }
    default:
      return state;
  }
};
