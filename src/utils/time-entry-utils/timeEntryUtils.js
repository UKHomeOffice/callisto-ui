import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

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
  return dayjs(dateTime).format('D MMMM');
};

export const formatDateTimeISO = (dateTime) => {
  return dayjs(dateTime).format('YYYY-MM-DDTHH:mm:ssZ');
};

export const formatLongDate = (dateTime) => {
  return dayjs(dateTime).format('D MMMM YYYY');
};

export const formatJustDay = (dateTime) => {
  return dayjs(dateTime).format('DD');
};

export const formatJustMonth = (dateTime) => {
  return dayjs(dateTime).format('MM');
};

export const formatJustYear = (dateTime) => {
  return dayjs(dateTime).format('YYYY');
};

export const removeTimecardContextEntry = (
  timeEntries,
  setTimeEntries,
  timeEntriesIndex
) => {
  if (timeEntriesIndex === 0) {
    setTimeEntries([...timeEntries.slice(1)]);
  } else {
    setTimeEntries([
      ...timeEntries.slice(0, timeEntriesIndex),
      ...timeEntries.slice(timeEntriesIndex + 1),
    ]);
  }
};

export const getTimePeriodTypesMap = (timePeriodTypes) => {
  return timePeriodTypes.reduce(
    (acc, type) => ({ ...acc, [type.id]: type.name }),
    {}
  );
};

export const isFinishTimeOnNextDay = (startTimeValue, finishTimeValue) => {
  if (startTimeValue && finishTimeValue) {
    return dayjs(formatDate(dayjs()) + finishTimeValue).isSameOrBefore(
      dayjs(formatDate(dayjs()) + startTimeValue)
    );
  }
  return false;
};
