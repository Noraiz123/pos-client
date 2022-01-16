import instance from './request';

export function createTag(data) {
  return instance.post('/api/tags', data);
}

export function getTags() {
  return instance.get('/api/tags');
}
