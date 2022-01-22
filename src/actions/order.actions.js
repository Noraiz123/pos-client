import { actionTypes } from '../constants/actionTypes';
import { createOrder, getOrder, getOrders, updateOrder } from '../api/order';
import { toast } from 'react-toastify';

export const createOrderAction = (payload) => {
  return {
    type: actionTypes.createOrder,
    payload,
  };
};

export const updateOrderAction = (payload) => {
  return {
    type: actionTypes.updateOrder,
    payload,
  };
};

const getOrdersAction = (payload) => {
  return {
    type: actionTypes.getOrders,
    payload,
  };
};

const getOrderAction = (payload) => {
  return {
    type: actionTypes.getOrder,
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

export const updateOrderStatusAction = (payload) => {
  return {
    type: actionTypes.updateOrderStatus,
    payload,
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

export const UpdateOrder = (data, id) => async (dispatch) => {
  const res = await updateOrder(data, id);
  if (res.status === 200) {
    dispatch(updateOrderAction(res.data));
    toast.success('Order Updated Successfully');
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

export const GetOrder = (id) => async (dispatch) => {
  const res = await getOrder(id);
  if (res.status === 200) {
    dispatch(getOrderAction(res.data));
  }
  return res;
};
