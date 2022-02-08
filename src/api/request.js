import axios from 'axios';
import { BASE_URL } from '../constants/apiUrl';
import store from '../config/store';
import { loginAction, LogoutRequest } from '../actions/auth.actions';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  req.headers.Accept = 'application/json';
  req.headers['api-version'] = 1;
  req.headers['authorization'] = token;
  req.headers['Content-Type'] = 'application/json';

  return req;
});

instance.interceptors.response.use(
  (res) => {
    store.dispatch(loginAction());
    return res;
  },
  (error) => {
    if (
      !error.request?.responseURL?.includes('sign_in') &&
      (error.toString().includes(401) || error.toString().includes(404))
    ) {
      // store.dispatch(LogoutRequest());
    }
    toast.error(error.response.data.message);
    return Promise.reject(error.response.data);
  }
);

export default instance;
