import axios from 'axios';

const headers = { 'Content-Type': 'application/json' };

// TODO: Get keycloak instance/token and add to headers

const instance = axios.create({
  headers,
});

// instance.interceptors.request.use((config) => {
//   config.params = {
//     ...config.params,
//   };
//   return config;
// });

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
};
