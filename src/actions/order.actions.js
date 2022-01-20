import { actionTypes } from '../constants/actionTypes';
import { createOrder, getOrders } from '../api/order';
import { toast } from 'react-toastify';

export const createOrderAction = (payload) => {
  return {
    type: actionTypes.createOrder,
    payload,
  };
};

const getOrdersAction = (payload) => {
  return {
    type: actionTypes.getOrders,
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
    toast.success('Order Created Successfully');
  }
  return res;
};

export const GetOrders = (data, filter) => async (dispatch) => {
  const res = await getOrders(data, filter);
  if (res.status === 200) {
    dispatch(getOrdersAction(res.data));
  }
  return res;
};
