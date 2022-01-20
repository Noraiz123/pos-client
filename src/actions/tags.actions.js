import { toast } from 'react-toastify';
import { createTag, getTags } from '../api/tags';
import { actionTypes } from '../constants/actionTypes';

const createTagAction = (payload) => {
  return {
    type: actionTypes.createTag,
    payload,
  };
};

const getTagsAction = (payload) => {
  return {
    type: actionTypes.getTags,
    payload,
  };
};

export const CreateTag = (data) => async (dispatch) => {
  const res = await createTag(data);
  if (res.status === 200) {
    dispatch(createTagAction(res.data));
    toast.success('Tag Created Successfully');
  }
  return res;
};

export const GetTags = (data) => async (dispatch) => {
  const res = await getTags(data);
  if (res.status === 200) {
    dispatch(getTagsAction(res.data));
  }
};
