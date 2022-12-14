import api from '../core';

const baseUrl = import.meta.env.VITE_ACCRUALS_API_URL;
const serviceName = 'Accruals Service ';

export const getHelloWorld = async (params) => {
  try {
    return await api.get(baseUrl + 'test', params);
  } catch (error) {
    throw new Error(serviceName + ' getHelloWorld function threw ' + error);
  }
};
