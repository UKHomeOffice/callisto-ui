import api from '../core';

const baseUrl = import.meta.env.VITE_TIMECARD_API_URL;
const serviceName = 'Timecard Service ';

export const getHelloWorld = async () => {
  try {
    return await api.get(baseUrl + 'api/v1/hello');
  } catch (error) {
    throw new Error(serviceName + ' getHelloWorld function threw ' + error);
  }
};

export const getTimecard = async (params) => {
  try {
    return await api.get(baseUrl + 'api/v1/timecard', params);
  } catch (error) {
    throw new Error(serviceName + ' getTimecard function threw ' + error);
  }
};

export const saveTimecard = async (payload, params) => {
  try {
    return await api.post(baseUrl + 'resources/time-entry', params, payload);
  } catch (error) {
    throw new Error(serviceName + ' saveTimecard function threw ' + error);
  }
};
