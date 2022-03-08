import { toast } from 'react-toastify';
import {
  createColor,
  createProduct,
  createSize,
  deleteProduct,
  getColors,
  getProduct,
  getProducts,
  getProductsStats,
  getSizes,
  updateProduct,
} from '../api/products';
import { actionTypes } from '../constants/actionTypes';

const getProductsAction = (payload) => {
  return {
    type: actionTypes.getProducts,
    payload,
  };
};

const getProductsStatsAction = (payload) => {
  return {
    type: actionTypes.getProductsStats,
    payload,
  };
};

const getProductAction = (payload) => {
  return {
    type: actionTypes.getProduct,
    payload,
  };
};

const getColorsAction = (payload) => {
  return {
    type: actionTypes.getColors,
    payload,
  };
};

const getSizesAction = (payload) => {
  return {
    type: actionTypes.getSizes,
    payload,
  };
};

const createProductAction = (payload) => {
  return {
    type: actionTypes.createProduct,
    payload,
  };
};

const createColorAction = (payload) => {
  return {
    type: actionTypes.createColor,
    payload,
  };
};

const createSizeAction = (payload) => {
  return {
    type: actionTypes.createSize,
    payload,
  };
};

const editProductAction = (payload) => {
  return {
    type: actionTypes.editProduct,
    payload,
  };
};

export const filterProductsAction = (payload) => {
  return {
    type: actionTypes.filterProducts,
    payload,
  };
};

export const filterProductsStatsAction = (payload) => {
  return {
    type: actionTypes.filterStats,
    payload,
  };
};

export const GetProducts = (data) => async (dispatch) => {
  const res = await getProducts(data);
  if (res.status === 200) {
    dispatch(getProductsAction(res.data));
  }
};

export const GetProductsStats = (data) => async (dispatch) => {
  const res = await getProductsStats(data);
  if (res.status === 200) {
    dispatch(getProductsStatsAction(res.data));
  }
};

export const GetProduct = (id) => async (dispatch) => {
  const res = await getProduct(id);
  if (res.status === 200) {
    dispatch(getProductAction(res.data));
  }
};

export const GetColors = () => async (dispatch) => {
  const res = await getColors();
  if (res.status === 200) {
    dispatch(getColorsAction(res.data));
  }
};

export const GetSizes = () => async (dispatch) => {
  const res = await getSizes();
  if (res.status === 200) {
    dispatch(getSizesAction(res.data));
  }
};

export const CreateProduct = (data) => async (dispatch) => {
  const res = await createProduct(data);
  if (res.status === 201) {
    dispatch(createProductAction(res.data));
    toast.success('Product Created Successfully');
  }
  return res;
};

export const CreateSize = (data) => async (dispatch) => {
  const res = await createSize(data);
  if (res.status === 200) {
    dispatch(createSizeAction(res.data));
    toast.success('Size Created Successfully');
  }
  return res;
};

export const CreateColor = (data) => async (dispatch) => {
  const res = await createColor(data);
  if (res.status === 200) {
    dispatch(createColorAction(res.data));
    toast.success('Color Created Successfully');
  }
  return res;
};

export const DeleteProduct = (id) => async (dispatch) => {
  const res = await deleteProduct(id);
  if (res.status === 204) {
    toast.success('Product Deleted Successfully');
  }
  return res;
};

export const EditProduct = (id, data) => async (dispatch) => {
  const res = await updateProduct(id, data);
  if (res.status === 200) {
    dispatch(editProductAction(res.data));
    toast.success('Product Updated Successfully');
  }
  return res;
};
