import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.orders, action) => {
  switch (action.type) {
    case actionTypes.getOrders: {
      const { orders, currentPage, totalPages } = action.payload;

      return { ...state, allOrders: orders, currentPage, totalPages };
    }
    case actionTypes.confirmOrder: {
      return { ...state, allOrders: state.allOrders.concat(action.payload) };
    }
    case actionTypes.getOrder: {
      return { ...state, order: action.payload };
    }
    case actionTypes.getOnHold: {
      return { ...state, onHold: action.payload };
    }
    case actionTypes.editOnHold: {
      return { ...state, currentOrder: action.payload };
    }
    case actionTypes.createOrder: {
      const alreadyExists = state.currentOrder.find((e) => e._id === action.payload._id);
      const createNew = !alreadyExists && state.currentOrder.concat(action.payload);
      const updateItem =
        alreadyExists && state.currentOrder.map((e) => (e._id === action.payload._id ? { ...action.payload } : e));
      return { ...state, currentOrder: alreadyExists ? updateItem : createNew };
    }
    case actionTypes.deleteOrderItem: {
      return {
        ...state,
        currentOrder: state.currentOrder.map((e) => (e._id === action.payload._id ? { ...e, delete: true } : e)),
      };
    }
    case actionTypes.deleteCurrentOrderItem: {
      return {
        ...state,
        currentOrder: state.currentOrder.filter((e) => e._id !== action.payload._id),
      };
    }
    case actionTypes.deleteAllOrderItems: {
      return { ...state, currentOrder: [] };
    }
    case actionTypes.updateOrder: {
      return { ...state, allOrders: state.allOrders.map((e) => (e.id === action.payload.id ? action.payload : e)) };
    }
    case actionTypes.updateOrderStatus: {
      return { ...state, orderStatus: action.payload };
    }
    default:
      return state;
  }
};
