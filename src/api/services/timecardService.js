import api from '../core';

const baseUrl = import.meta.env.VITE_TIMECARD_API_URL;
const serviceName = 'Timecard Service ';

export const getHelloWorld = async () => {
  try {
    return await api.get(baseUrl + 'api/v1/');
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

export const getTimePeriodTypes = async (params) => {
  try {
    return await api.get(baseUrl + 'resources/time-period-type', params);
  } catch (error) {
    throw new Error(serviceName + ' getTimePeriodType function threw ' + error);
  }
};
