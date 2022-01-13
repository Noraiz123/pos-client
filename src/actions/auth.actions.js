import { loginRequest } from '../api/auth';
import { actionTypes } from '../constants/actionTypes';

const loginAction = (payload) => {
  return {
    type: actionTypes.login,
    payload,
  };
};

export const LoginRequest = (data) => async (dispatch) => {
  const res = await loginRequest(data);
  if (res.status === 200) {
    dispatch(loginAction(res.data))
    window.location.href = '/';
    const token = res.headers['access-token'];
    const uid = res.headers.uid;
    const client = res.headers.client;
    localStorage.setItem('uid', uid);
    localStorage.setItem('client', client);
    localStorage.setItem('token', token);
  }
};
