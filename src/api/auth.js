import { BASE_URL } from "../constants/apiUrl";
import axios from "axios"

export function loginRequest(data) {
  return axios.post(BASE_URL + '/auth/sign_in', data);
}
