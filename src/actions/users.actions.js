import { createUser, deleteUser, getUsers, updateUser } from '../api/user';
import { actionTypes } from '../constants/actionTypes';

const createUserAction = (payload) => {
  return {
    type: actionTypes.createUser,
    payload,
  };
};

const getUsersAction = (payload) => {
  return {
    type: actionTypes.getUsers,
    payload,
  };
};

const deleteUserAction = (payload) => {
  return {
    type: actionTypes.deleteUser,
    payload,
  };
};

const updateUserAction = (payload) => {
  return {
    type: actionTypes.updateUser,
    payload,
  };
};

export const CreateUser = (data) => async (dispatch) => {
  const res = await createUser(data);
  if (res.status === 200) {
    dispatch(createUserAction(res.data));
  }
  return res;
};

export const GetUsers = () => async (dispatch) => {
  const res = await getUsers();
  if (res.status === 200) {
    dispatch(getUsersAction(res.data));
  }
  return res;
};

export const DeleteUser = (id) => async (dispatch) => {
  const res = await deleteUser(id);
  if (res.status === 204) {
    const customers = await getUsers();
    dispatch(deleteUserAction(customers.data));
  }
};

export const UpdateUser = (id, data) => async (dispatch) => {
  const res = await updateUser(id, data);
  if (res.status === 200) {
    dispatch(updateUserAction(res.data));
  }
};
