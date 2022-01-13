import axios from 'axios';
import { BASE_URL } from '../constants/apiUrl';

axios.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  const client = localStorage.getItem('client');
  const uuid = localStorage.getItem('uid');
  req.headers.Accept = 'application/json';
  req.headers['api-version'] = 1;
  req.headers['access-token'] = token;
  req.headers.client = client;
  req.headers.uid = uuid;

  return req;
});

export function createCategory(data) {
  return axios.post(BASE_URL + '/api/categories', data);
}

export function getCategories() {
  return axios.get(BASE_URL + '/api/categories');
}
