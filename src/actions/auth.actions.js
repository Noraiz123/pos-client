import { toast } from 'react-toastify';
import { loginRequest } from '../api/auth';
import { actionTypes } from '../constants/actionTypes';

export const loginAction = () => {
  return {
    type: actionTypes.login,
  };
};

const logoutAction = () => {
  return {
    type: actionTypes.logout,
  };
};

export const LoginRequest = (data, navigate) => async (dispatch) => {
  const res = await loginRequest(data);
  if (res.status === 200) {
    navigate('/');
    const token = res.data['token'];
    toast.success('LoggedIn Successfully');
    dispatch(loginAction());
    localStorage.setItem('token', token);
  }
};

export const LogoutRequest = () => async (dispatch) => {
  window.location.href = '/login';
  dispatch(logoutAction());
  localStorage.removeItem('uid');
  localStorage.removeItem('client');
  localStorage.removeItem('token');
};
