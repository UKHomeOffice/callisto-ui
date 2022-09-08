import dayjs from 'dayjs';
import {
  filterOnOrAfterDate,
  filterBeforeDate,
} from '../resource-filter-builder/resourceFilterBuilder';

export const filterTimeEntriesOnDate = (date) => {
  let startOfDateFilter = filterOnOrAfterDate('actualStartTime', date);
  let endOfDateFilter = filterBeforeDate(
    'actualStartTime',
    dayjs(date).add(1, 'day')
  );
  return [startOfDateFilter, endOfDateFilter];
};
