import { actionTypes } from '../constants/actionTypes';

export const createOrderAction = (payload) => {
  return {
    type: actionTypes.createOrder,
    payload,
  };
};

export const deleteOrderItemAction = (payload) => {
  return {
    type: actionTypes.deleteOrderItem,
    payload,
  };
};

export const deleteAllOrderItemsAction = () => {
  return {
    type: actionTypes.deleteAllOrderItems,
  };
};
