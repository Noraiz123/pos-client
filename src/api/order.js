import instance from './request';

export function getOrders(data, filter) {
 return instance.get(`/api/orders?page=${filter.page}&&per_page=${filter.perPage}`, {
    params: data,
  });
}

export function createOrder(data) {
  return instance.post('/api/orders', data);
}
