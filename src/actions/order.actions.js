import { actionTypes } from '../constants/actionTypes';
import { createOrder } from '../api/order';

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

const confirmOrderAction = (payload) => {
  return {
    type: actionTypes.confirmOrder,
    payload,
  };
};

export const ConfirmOrder = (data) => async (dispatch) => {
  const res = await createOrder(data);
  if (res.status === 200) {
    dispatch(confirmOrderAction(res.data));
  }
  return res
};
