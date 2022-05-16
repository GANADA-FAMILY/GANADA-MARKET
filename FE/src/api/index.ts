import axios from 'axios';
import { API_URL } from 'constants/url';

axios.defaults.baseURL = API_URL;

function defaultInstance() {
  return axios.create({
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function multipartInstance() {
  return axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    },
  });
}

export { defaultInstance, multipartInstance };
