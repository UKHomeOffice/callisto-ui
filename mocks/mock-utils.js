const getEmptyApiResponse = () => {
  return {
    meta: {
      next: null,
    },
    items: [],
  };
};

const getBaseTimeEntry = () => {
  return {
    id: '',
    tenantId: '00000000-0000-0000-0000-000000000000',
    ownerId: 1,
    timePeriodTypeId: '',
    timePeriodType: '',
    shiftType: '',
    actualStartTime: '',
    actualEndTime: '',
    createdAt: '2022-08-24T12:01:43.786+00:00',
    updatedAt: '2022-08-24T12:01:43.786+00:00',
  };
};

const createTimeEntry = (timeEntryData) => {
  return Object.assign(getBaseTimeEntry(), timeEntryData);
};

const getApiResponseWithItems = (...items) => {
  const apiResponse = getEmptyApiResponse();
  apiResponse.items = [...items];
  return apiResponse;
};

module.exports = {
  getApiResponseWithItems,
  createTimeEntry,
};
