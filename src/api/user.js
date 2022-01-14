import instance from './request';

export function createUser(data) {
  return instance.post('/api/customers', data);
}

export function getUsers() {
  return instance.get('/api/customers');
}

export function deleteUser(id) {
  return instance.delete(`/api/customers/${id}`);
}

export function updateUser(id, data) {
  return instance.put(`/api/customers/${id}`, data);
}
