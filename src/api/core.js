import axios from 'axios';

const headers = { 'Content-Type': 'application/json' };

const instance = axios.create({
  headers,
});

export default {
  get: (endpoint, params) =>
    instance({
      method: 'GET',
      url: endpoint,
      params: params,
    }),
  post: (endpoint, params, data) =>
    instance({
      method: 'POST',
      url: endpoint,
      params: params,
      data,
    }),
  put: (endpoint, params, data) =>
    instance({
      method: 'PUT',
      url: endpoint,
      params: params,
      data,
    }),
  delete: (endpoint, params) =>
    instance({
      method: 'DELETE',
      url: endpoint,
      params: params,
    }),
};
