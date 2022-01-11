import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.orders, action) => {
  switch (action.type) {
    case actionTypes.getOrders: {
      return { ...state, allOrders: action.payload };
    }
    case actionTypes.getOrder: {
      return { ...state, order: action.payload };
    }
    case actionTypes.createOrder: {
      const alreadyExists = state.currentOrder.find((e) => e.id === action.payload.id);
      const createNew = !alreadyExists && state.currentOrder.concat(action.payload);
      const updateItem =
        alreadyExists &&
        state.currentOrder.map((e) => (e.id === action.payload.id ? { ...e, quantity: e.quantity + 1 } : e));
      console.log(updateItem);
      return { ...state, currentOrder: alreadyExists ? updateItem : createNew };
    }
    case actionTypes.deleteOrderItem: {
      return { ...state, currentOrder: state.currentOrder.filter((e) => e.id !== action.payload.id) };
    }
    case actionTypes.deleteAllOrderItems: {
      return { ...state, currentOrder: [] };
    }
    case actionTypes.editOrder: {
      return { ...state, allOrders: state.allOrders.map((e) => (e.id === action.payload.id ? action.payload : e)) };
    }
    default:
      return state;
  }
};
