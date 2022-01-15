import instance from './request';

export function createVendor(data) {
  return instance.post('/api/vendors', data);
}

export function getVendors() {
  return instance.get('/api/vendors');
}

export function deleteVendor(id) {
  return instance.delete(`/api/vendors/${id}`);
}

export function updateVendor(id, data) {
  return instance.put(`/api/vendors/${id}`, data);
}
