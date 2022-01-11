import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.products, action) => {
  switch (action.type) {
    case actionTypes.getProducts: {
      return { ...state, products: action.payload.products };
    }
    case actionTypes.getProduct: {
      return { ...state, product: action.payload };
    }
    case actionTypes.createProduct: {
      return { ...state, products: state.products.concat(action.payload) };
    }
    case actionTypes.deleteProduct: {
      return { ...state, products: state.products.concat(action.payload) };
    }
    case actionTypes.editProduct: {
      return { ...state, products: state.products.map((e) => (e.id === action.payload.id ? action.payload : e)) };
    }
    case actionTypes.createSize: {
      return { ...state, productSizes: state.productSizes.concat(action.payload) };
    }
    case actionTypes.getSizes: {
      return { ...state, productSizes: action.payload.product_sizes };
    }
    case actionTypes.createColor: {
      return { ...state, productColors: state.productColors.concat(action.payload) };
    }
    case actionTypes.getColors: {
      return { ...state, productColors: action.payload.product_colors };
    }
    default:
      return state;
  }
};
