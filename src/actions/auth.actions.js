import { loginRequest } from "../api/auth";

export function login(data) {
  return (dispatch) => {
    loginRequest(data)
      .then((res) => {
        window.location.href = '/' ;
        const token = res.headers['access-token'];
        const uid = res.headers.uid;
        const client = res.headers.client;
        localStorage.setItem('uid', uid);
        localStorage.setItem('client', client);
        localStorage.setItem('token', token);
      })
      .catch((err) => {
        alert(`${err.message}`);
      });
  };
}
