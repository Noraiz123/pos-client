import { BASE_URL } from '../constants/apiUrl';
import axios from 'axios';

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

export function getProducts(data) {
  return axios.get(BASE_URL + '/api/products', data);
}

export function getProduct(id) {
  return axios.get(BASE_URL + `/api/products/${id}`);
}

export function getColors() {
  return axios.get(BASE_URL + '/api/product/colors');
}

export function getSizes() {
  return axios.get(BASE_URL + '/api/product/sizes');
}

export function createProduct(data) {
  return axios.post(BASE_URL + '/api/products', data);
}

export function createSize(size) {
  return axios.post(BASE_URL + `/api/product/sizes?product_size[name]=${size}`);
}

export function createColor(color) {
  return axios.post(BASE_URL + `/api/product/colors?product_color[name]=${color}`);
}

export function deleteProduct(id) {
  return axios.delete(BASE_URL + `/api/products/${id}`);
}

export function updateProduct(id, body) {
  return axios.put(BASE_URL + `/api/products/${id}`, body);
}
