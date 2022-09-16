import dayjs from 'dayjs';
import { deepClone } from '../common-utils/common-utils';

export const midnight = '00:00';

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

export const formatDateTimeISO = (dateTime) => {
  return dayjs(dateTime).format('YYYY-MM-DDTHH:mm:ssZ');
};

export const removeTimecardContextEntry = (
  timeEntries,
  setTimeEntries,
  removeAtIndex
) => {
  const newTimeEntries = deepClone(timeEntries);
  newTimeEntries.splice(removeAtIndex, 1);
  setTimeEntries(newTimeEntries);
};
