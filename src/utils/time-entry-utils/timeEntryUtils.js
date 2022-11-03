import dayjs from 'dayjs';
import { deepCloneJson } from '../common-utils/common-utils';

export const addTimePeriodHeading = 'Add time period';

export const getSingleTimeEntryResponseItem = (timeEntryResponseData) => {
  if (timeEntryResponseData.items && timeEntryResponseData.items.length > 0)
    return timeEntryResponseData.items[0];
  throw new Error(
    'The time entry response data did not contain at least one time entry.'
  );
};

export const formatTime = (time) => {
  return dayjs(time).format('HH:mm');
};

export const formatDate = (dateTime) => {
  return dayjs(dateTime).format('YYYY-MM-DD');
};

export const formatDateNoYear = (dateTime) => {
  return dayjs(dateTime).format('DD MMMM');
};

export const formatDateTimeISO = (dateTime) => {
  return dayjs(dateTime).format('YYYY-MM-DDTHH:mm:ssZ');
};

export const removeTimecardContextEntry = (
  timeEntries,
  setTimeEntries,
  removeAtIndex
) => {
  const newTimeEntries = deepCloneJson(timeEntries);
  newTimeEntries.splice(removeAtIndex, 1);
  setTimeEntries(newTimeEntries);
};

export const isFinishTimeOnNextDay = (startTimeValue, finishTimeValue) => {
  if (startTimeValue && finishTimeValue) {
    return dayjs(dayjs().format('YYYY-MM-DD') + '' + finishTimeValue).isBefore(
      dayjs(dayjs().format('YYYY-MM-DD') + '' + startTimeValue)
    );
  }
  return false;
};
