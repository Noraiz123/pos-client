import {
  createColor,
  createProduct,
  createSize,
  deleteProduct,
  getColors,
  getProduct,
  getProducts,
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

const deleteProductAction = (payload) => {
  return {
    type: actionTypes.deleteProduct,
    payload,
  };
};

const editProductAction = (payload) => {
  return {
    type: actionTypes.editProduct,
    payload,
  };
};

export const GetProducts = () => async (dispatch) => {
  const res = await getProducts();
  if (res.status === 200) {
    dispatch(getProductsAction(res.data));
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
  if (res.status === 200) {
    dispatch(createProductAction(res.data));
  }
};

export const CreateSize = (data) => async (dispatch) => {
  const res = await createSize(data);
  if (res.status === 200) {
    dispatch(createSizeAction(res.data));
    return res;
  }
};

export const CreateColor = (data) => async (dispatch) => {
  const res = await createColor(data);
  if (res.status === 200) {
    dispatch(createColorAction(res.data));
    return res;
  }
};

export const DeleteProduct = (id) => async (dispatch) => {
  const res = await deleteProduct(id);
  if (res.status === 200) {
    dispatch(deleteProductAction(res.data));
    return res;
  }
};

export const EditProduct = (id, data) => async (dispatch) => {
  const res = await updateProduct(id, data);
  if (res.status === 200) {
    dispatch(editProductAction(res.data));
    return res;
  }
};
