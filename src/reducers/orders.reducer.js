import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.orders, action) => {
  switch (action.type) {
    case actionTypes.getOrders: {
      const { orders, currentPage, totalPages, totalTransactions, totalSales, totalProfit, chartStats } =
        action.payload;

      return {
        ...state,
        allOrders: orders,
        currentPage,
        totalPages,
        totalTransactions,
        totalSales,
        totalProfit,
        chartStats,
      };
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
      let alreadyExists;
      let createNew;
      let updateItem;
      if (action.status === 'CREATE_ORDER') {
        alreadyExists = state.currentOrder.find((e) => e._id === action.payload._id);
        if (alreadyExists) {
          updateItem =
            alreadyExists &&
            state.currentOrder.map((e) =>
              e._id === action.payload._id ? { ...e, orderQuantity: action.payload.orderQuantity } : e
            );
        } else {
          createNew = !alreadyExists && state.currentOrder.concat(action.payload);
        }
      } else {
        alreadyExists = state.currentOrder.filter((e) => e._id === action.payload._id);
        if (alreadyExists.length > 0) {
          if (alreadyExists.length === 1) {
            if (
              (alreadyExists[0]?.currentPrice && alreadyExists[0].currentPrice !== action.payload.price) ||
              (alreadyExists[0]?.currentDiscount && alreadyExists[0].currentDiscount !== action.payload.discount)
            ) {
              createNew = state.currentOrder.concat({
                ...action.payload,
                uuid: Math.random(),
                orderQuantity:
                  action.payload.orderQuantity > alreadyExists[0].previousQuantity
                    ? action.payload.orderQuantity - alreadyExists[0].previousQuantity
                    : alreadyExists[0].previousQuantity - action.payload.orderQuantity,
              });
            } else {
              updateItem = state.currentOrder.map((e) =>
                e._id === action.payload._id ? { ...e, orderQuantity: action.payload.orderQuantity } : e
              );
            }
          } else {
            updateItem = state.currentOrder.map((e) =>
              e._id === action.payload._id &&
              ((e.currentPrice && e?.currentPrice === e.price) || e?.currentPrice === undefined)
                ? { ...e, orderQuantity: action.payload.orderQuantity }
                : e
            );
          }
        } else {
          createNew = state.currentOrder.concat({ ...action.payload, uuid: Math.random() });
        }
      }

      return { ...state, currentOrder: updateItem ? updateItem : createNew };
    }
    case actionTypes.deleteOrderItem: {
      return {
        ...state,
        currentOrder: state.currentOrder.map((e) =>
          e._id === action.payload._id && e.uuid === action.payload.uuid ? { ...e, delete: true } : e
        ),
      };
    }
    case actionTypes.deleteCurrentOrderItem: {
      return {
        ...state,
        currentOrder: state.currentOrder.filter((e) => e.uuid !== action.payload.uuid && e._id === action.payload._id),
      };
    }
    case actionTypes.deleteAllOrderItems: {
      return { ...state, currentOrder: [] };
    }
    case actionTypes.updateOrder: {
      return { ...state, allOrders: state.allOrders.map((e) => (e._id === action.payload._id ? action.payload : e)) };
    }
    case actionTypes.updateOrderStatus: {
      return { ...state, orderStatus: action.payload };
    }
    default:
      return state;
  }
};
