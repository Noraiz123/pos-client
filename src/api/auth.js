import instance from './request';

export function loginRequest(data) {
  return instance.post(`/api/auth/sign_in?email=${data.email}&password=${data.password}`);
}
