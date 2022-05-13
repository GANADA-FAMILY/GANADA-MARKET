import axios from 'axios';
import { API_URL } from 'constants/url';

function defaultInstance() {
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function multipartInstance() {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    },
  });
}

export { defaultInstance, multipartInstance };
