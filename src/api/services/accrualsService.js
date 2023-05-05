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

export const getAccruals = async (params) => {
  try {
    return await api.get(baseUrl + 'resources/accruals', params);
  } catch (error) {
    throw new Error(serviceName + ' getAccruals function threw ' + error);
  }
};

export const getAgreements = async (params) => {
  try {
    return await api.get(baseUrl + 'resources/agreements', params);
  } catch (error) {
    throw new Error(serviceName + ' getAgreements function threw ' + error);
  }
};

export const getAgreementTargets = async (params) => {
  try {
    return await api.get(baseUrl + 'resources/agreement-targets', params);
  } catch (error) {
    throw new Error(serviceName + ' getAgreements function threw ' + error);
  }
};
