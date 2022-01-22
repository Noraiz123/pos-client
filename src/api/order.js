import instance from './request';

export function getOrders(data, filter) {
  return instance.get(`/api/orders?page=${filter.page}&&per_page=${filter.perPage}`, {
    params: data,
  });
}

export function getOrder(id) {
  return instance.get(`/api/orders/${id}`);
}

export function createOrder(data) {
  return instance.post('/api/orders', data);
}

export function updateOrder(data, id) {
  return instance.put(`/api/orders/${id}`, data);
}
