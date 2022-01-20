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
    const token = res.headers['access-token'];
    const uid = res.headers.uid;
    const client = res.headers.client;
    toast.success('LoggedIn Successfully');
    dispatch(loginAction());
    localStorage.setItem('uid', uid);
    localStorage.setItem('client', client);
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
