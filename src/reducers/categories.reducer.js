import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.categories, action) => {
  switch (action.type) {
    case actionTypes.getCategories: {
      return (state = action.payload.categories);
    }
    case actionTypes.createCategory: {
      return (state = action.payload);
    }
    default:
      return state;
  }
};
