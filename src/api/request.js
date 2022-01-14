import axios from 'axios';
import { BASE_URL } from '../constants/apiUrl';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((req) => {
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

export default instance;
