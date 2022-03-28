import axios from 'axios';

const headers = { 'Content-Type': 'application/json' };

const instance = axios.create({
  headers,
});

export default {
  get: (endpoint, token) =>
    instance({
      headers: { 'X-SPOOF-AUTHORIZATION': `Bearer ${token}` },
      method: 'GET',
      url: endpoint,
    }),
  post: (endpoint, data, token) =>
    instance({
      headers: { 'X-SPOOF-AUTHORIZATION': `Bearer ${token}` },
      method: 'POST',
      url: endpoint,
      data,
    }),
  put: (endpoint, data, token) =>
    instance({
      headers: { 'X-SPOOF-AUTHORIZATION': `Bearer ${token}` },
      method: 'PUT',
      url: endpoint,
      data,
    }),
};
