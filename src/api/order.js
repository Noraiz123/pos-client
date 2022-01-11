import axios from 'axios';
import store from '../config/store';
import { BASE_URL } from '../constants/apiUrl';

axios.interceptors.request.use((req) => {
  const state = store.getState();
  // if (state.auth.isSignedIn) {
  const token = localStorage.getItem('token');
  const client = localStorage.getItem('client');
  const uuid = localStorage.getItem('uid');
  req.headers.Accept = 'application/json';
  req.headers['api-version'] = 1;
  req.headers['access-token'] = token;
  req.headers.client = client;
  req.headers.uid = uuid;
  // }

  return req;
});

export function getOrders() {
  return axios.get(BASE_URL + '/api/orders');
}

export function createOrder(data) {
  return axios.post(BASE_URL + '/api/orders', data);
}
