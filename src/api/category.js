import instance from './request';

export function createCategory(data) {
  return instance.post('/api/categories', data);
}

export function getCategories() {
  return instance.get('/api/categories');
}

export function updateCategory(id, data) {
  return instance.put(`/api/categories/${id}`, data);
}

export function deleteCategory(id) {
  return instance.delete(`/api/categories/${id}`);
}
