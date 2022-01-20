import { toast } from 'react-toastify';
import { createCategory, getCategories } from '../api/category';
import { actionTypes } from '../constants/actionTypes';

const createCategoryAction = (payload) => {
  return {
    type: actionTypes.createCategory,
    payload,
  };
};

const getCategoriesAction = (payload) => {
  return {
    type: actionTypes.getCategories,
    payload,
  };
};

export const CreateCategory = (data) => async (dispatch) => {
  const res = await createCategory(data);
  if (res.status === 200) {
    dispatch(createCategoryAction(res.data));
    toast.success('Category Created Successfully');
  }
};

export const GetCategories = (data) => async (dispatch) => {
  const res = await getCategories(data);
  if (res.status === 200) {
    dispatch(getCategoriesAction(res.data));
  }
};
