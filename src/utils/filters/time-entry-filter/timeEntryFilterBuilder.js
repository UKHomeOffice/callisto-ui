import dayjs from 'dayjs';
import {
  filterOnOrAfterDate,
  filterBeforeDate,
} from '../resource-filter-builder/resourceFilterBuilder';

export const filterTimeEntriesOnDate = (resourceDateProperty, date) => {
  const startOfDateFilter = filterOnOrAfterDate(resourceDateProperty, date);
  const endOfDateFilter = filterBeforeDate(
    resourceDateProperty,
    dayjs(date).add(1, 'day')
  );
  return [startOfDateFilter, endOfDateFilter];
};
