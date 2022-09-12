import dayjs from 'dayjs';
import { formatDateTimeISO } from '../../time-entry-utils/timeEntryUtils';

export const filterOnOrAfterDate = (resourceDateProperty, date) => {
  let dateMidnight = formatDateTimeISO(dayjs(date).startOf('day'));
  return resourceDateProperty + ">='" + dateMidnight + "'";
};

export const filterBeforeDate = (resourceDateProperty, date) => {
  let beforeDate = formatDateTimeISO(
    dayjs(date).startOf('day').subtract(1, 'minute')
  );
  return resourceDateProperty + "<='" + beforeDate + "'";
};
