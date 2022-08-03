import api from '../core';

const baseUrl = 'https://timecard.dev.callisto.homeoffice.gov.uk'; //TODO: Move to env variable

export const getTimecard = async (params) => {
  try {
    return await api.get(baseUrl + '/api/timecard', params);
  } catch (error) {
    throw new Error('timecardService getTimecard error:' + error);
    //TODO: post/log error
  }
};

export const createTimecard = async (params, data) => {
  try {
    return await api.post(baseUrl + '/api/timecard', params, data);
  } catch (error) {
    throw new Error('timecardService createTimecard error:' + error);
  }
};

export const updateTimecard = async (data) => {
  try {
    return await api.put(baseUrl + '/api/timecard', data);
  } catch (error) {
    throw new Error('timecardService updateTimecard error:' + error);
  }
};
