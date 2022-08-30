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

export const getTimeEntry = async (id, params) => {
  try {
    return await api.get(baseUrl + 'resources/time-entry/' + id, params);
  } catch (error) {
    throw new Error(serviceName + ' getTimeEntry function threw ' + error);
  }
};


export const getTimeEntries = async (params) => {
  try {
    return await api.get(baseUrl + 'resources/time-entry/', params);
  } catch (error) {
    throw new Error(serviceName + ' getTimeEntries function threw ' + error);
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

export const updateTimeEntry = async (id, payload, params) => {
  try {
    return await api.put(baseUrl + 'resources/time-entry/' + id, params, payload);
  } catch (error) {
    throw new Error(serviceName + ' updateTimeEntry function threw ' + error);
  }
};
