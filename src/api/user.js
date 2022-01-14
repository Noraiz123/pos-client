import instance from './request';

export function createUser(data) {
  return instance.post('/api/users', data);
}

export function getUsers() {
  return instance.get('/api/users');
}

export function deleteUser(id) {
  return instance.delete(`/api/users/${id}`);
}

export function updateUser(id, data) {
  return instance.put(`/api/users/${id}`, data);
}
