import instance from './request';

export function getOrders() {
  return instance.get('/api/orders');
}

export function createOrder(data) {
  return instance.post('/api/orders', data);
}
