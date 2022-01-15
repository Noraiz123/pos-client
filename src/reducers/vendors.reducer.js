import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.vendors, action) => {
  switch (action.type) {
    case actionTypes.getVendors: {
      return (state = action.payload.vendors);
    }
    case actionTypes.createVendor: {
      return (state = state.concat(action.payload));
    }
    case actionTypes.deleteVendor: {
      return (state = action.payload.vendors);
    }
    case actionTypes.updateVendor: {
      return (state = state.map((e) => (e.id === action.payload.id ? action.payload : e)));
    }
    default:
      return state;
  }
};
