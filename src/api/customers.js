import instance from './request';

export function createCustomer(data) {
  return instance.post('/api/customers', data);
}

export function getCustomers() {
  return instance.get('/api/customers');
}

export function deleteCustomer(id) {
  return instance.delete(`/api/customers/${id}`);
}

export function updateCustomer(id, data) {
  return instance.put(`/api/customers/${id}`, data);
}
