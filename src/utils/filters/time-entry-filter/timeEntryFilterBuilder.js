import dayjs from 'dayjs';
import {
  filterOnOrAfterDate,
  filterBeforeDate,
  joinOrConditions,
  joinAndConditions,
} from '../resource-filter-builder/resourceFilterBuilder';

const filterTimeEntriesOnDate = (resourceDateProperty, date) => {
  const startOfDateFilter = filterOnOrAfterDate(resourceDateProperty, date);
  const endOfDateFilter = filterBeforeDate(
    resourceDateProperty,
    dayjs(date).add(1, 'day')
  );
  return [startOfDateFilter, endOfDateFilter];
};

export const buildTimeEntriesFilter = (date, userId) => {
  const startDateFilterCondition = joinAndConditions(
    "ownerId=='" + userId + "'",
    ...filterTimeEntriesOnDate('actualStartTime', date)
  );

  const endDateFilterCondition = joinAndConditions(
    "ownerId=='" + userId + "'",
    ...filterTimeEntriesOnDate('actualEndTime', date)
  );

  const joinedStartEndDate = joinOrConditions(
    startDateFilterCondition,
    endDateFilterCondition
  );

  return joinedStartEndDate;
};
