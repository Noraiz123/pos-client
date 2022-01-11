import { BASE_URL } from '../constants/apiUrl';
import axios from 'axios';

export function loginRequest(data) {
  return axios.post(BASE_URL + `/api/auth/sign_in?email=${data.email}&password=${data.password}`);
}
