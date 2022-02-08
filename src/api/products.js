import instance from './request';

export function getProducts(data) {
  return instance.get(
    `/products?page=${data.page}&&category_id=${data.category_id}&&search_keyword=${data.keyword}&&per_page=${data.per_page}`
  );
}

export function getProduct(id) {
  return instance.get(`/api/products/${id}`);
}

export function getProductsStats(data) {
  return instance.get(
    `/api/products/stats?search_keyword=${data.keyword}&&page=${data.page}&&per_page=${data.perPage}`
  );
}

export function getColors() {
  return instance.get('/api/product/colors');
}

export function getSizes() {
  return instance.get('/api/product/sizes');
}

export function createProduct(data) {
  return instance.post('/products', data);
}

export function createSize(size) {
  return instance.post(`/api/product/sizes?product_size[name]=${size}`);
}

export function createColor(color) {
  return instance.post(`/api/product/colors?product_color[name]=${color}`);
}

export function deleteProduct(id) {
  return instance.delete(`/api/products/${id}`);
}

export function updateProduct(id, body) {
  return instance.put(`/api/products/${id}`, body);
}
