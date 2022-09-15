import dayjs from 'dayjs';
import { formatDateTimeISO } from '../../time-entry-utils/timeEntryUtils';

export const filterOnOrAfterDate = (resourceDateProperty, date) => {
  const dateMidnight = formatDateTimeISO(dayjs(date).startOf('day'));
  return `${resourceDateProperty}>='${dateMidnight}'`;
};

export const filterBeforeDate = (resourceDateProperty, date) => {
  const beforeDate = formatDateTimeISO(
    dayjs(date).startOf('day').subtract(1, 'minute')
  );
  return `${resourceDateProperty}<='${beforeDate}'`;
};
