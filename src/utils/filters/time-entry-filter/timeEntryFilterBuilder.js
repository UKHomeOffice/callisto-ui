import dayjs from 'dayjs';
import {
  filterOnOrAfterDate,
  filterBeforeDate,
} from '../resource-filter-builder/resourceFilterBuilder';

export const filterTimeEntriesOnDate = (date) => {
  const startOfDateFilter = filterOnOrAfterDate('actualStartTime', date);
  const endOfDateFilter = filterBeforeDate(
    'actualStartTime',
    dayjs(date).add(1, 'day')
  );
  return [startOfDateFilter, endOfDateFilter];
};
