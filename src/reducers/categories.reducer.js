import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.categories, action) => {
  switch (action.type) {
    case actionTypes.getCategories: {
      return (state = action.payload.categories);
    }
    case actionTypes.createCategory: {
      return (state = state.concat(action.payload));
    }
    case actionTypes.updateCategory: {
      return (state = state.map((e) => (e.id === action.payload.id ? action.payload : e)));
    }
    case actionTypes.deleteCategory: {
      return (state = action.payload.categories);
    }
    default:
      return state;
  }
};
