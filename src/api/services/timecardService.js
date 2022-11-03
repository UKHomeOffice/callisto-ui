import api from '../core';

const baseUrl = import.meta.env.VITE_TIMECARD_API_URL;
const serviceName = 'Timecard Service ';

export const getTimecard = async (params) => {
  try {
    return await api.get(baseUrl + 'api/v1/timecard', params);
  } catch (error) {
    throw new Error(serviceName + ' getTimecard function threw ' + error);
  }
};

export const getTimeEntries = async (params) => {
  try {
    return await api.get(baseUrl + 'resources/time-entries/', params);
  } catch (error) {
    throw new Error(serviceName + ' getTimeEntries function threw ' + error);
  }
};

export const createTimeEntry = async (payload, params) => {
  return await api.post(baseUrl + 'resources/time-entries', params, payload);
};

export const updateTimeEntry = async (id, payload, params) => {
  return await api.put(
    baseUrl + 'resources/time-entries/' + id,
    params,
    payload
  );
};

export const getTimePeriodTypes = async (params) => {
  try {
    return await api.get(baseUrl + 'resources/time-period-types', params);
  } catch (error) {
    throw new Error(
      serviceName + ' getTimePeriodTypes function threw ' + error
    );
  }
};

export const deleteTimeEntry = async (id, params) => {
  try {
    return await api.delete(baseUrl + `resources/time-entries/${id}`, params);
  } catch (error) {
    throw new Error(serviceName + ' deleteTimeEntry function threw ' + error);
  }
};

export const getTimePeriodTypes2 = async (params) => {
  try {
    return await api.get(baseUrl + 'resources/time-period-types', params);
  } catch (error) {
    throw new Error(
      serviceName + ' getTimePeriodTypes function threw ' + error
    );
  }
};

export const deleteTimeEntry2 = async (id, params) => {
  try {
    return await api.delete(baseUrl + `resources/time-entries/${id}`, params);
  } catch (error) {
    throw new Error(serviceName + ' deleteTimeEntry function threw ' + error);
  }
};

export const getTimePeriodTypes3 = async (params) => {
  try {
    return await api.get(baseUrl + 'resources/time-period-types', params);
  } catch (error) {
    throw new Error(
      serviceName + ' getTimePeriodTypes function threw ' + error
    );
  }
};

export const deleteTimeEntry3 = async (id, params) => {
  try {
    return await api.delete(baseUrl + `resources/time-entries/${id}`, params);
  } catch (error) {
    throw new Error(serviceName + ' deleteTimeEntry function threw ' + error);
  }
};

export const getTimePeriodTypes4 = async (params) => {
  try {
    return await api.get(baseUrl + 'resources/time-period-types', params);
  } catch (error) {
    throw new Error(
      serviceName + ' getTimePeriodTypes function threw ' + error
    );
  }
};

export const deleteTimeEntry4 = async (id, params) => {
  try {
    return await api.delete(baseUrl + `resources/time-entries/${id}`, params);
  } catch (error) {
    throw new Error(serviceName + ' deleteTimeEntry function threw ' + error);
  }
};

export const getTimePeriodTypes5 = async (params) => {
  try {
    return await api.get(baseUrl + 'resources/time-period-types', params);
  } catch (error) {
    throw new Error(
      serviceName + ' getTimePeriodTypes function threw ' + error
    );
  }
};

export const deleteTimeEntry5 = async (id, params) => {
  try {
    return await api.delete(baseUrl + `resources/time-entries/${id}`, params);
  } catch (error) {
    throw new Error(serviceName + ' deleteTimeEntry function threw ' + error);
  }
};
