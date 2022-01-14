import instance from './request';

export function createCategory(data) {
  return instance.post('/api/categories', data);
}

export function getCategories() {
  return instance.get('/api/categories');
}
