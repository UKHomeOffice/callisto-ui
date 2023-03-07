import dayjs from 'dayjs';
import {
  filterOnOrAfterDate,
  filterBeforeDate,
  joinOrConditions,
  joinAndConditions,
} from '../resource-filter-builder/resourceFilterBuilder';

const filterTimeEntriesOnDate = (resourceDateProperty, date) => {
  const startOfDateFilter = filterOnOrAfterDate(
    resourceDateProperty,
    dayjs(date).subtract(1, 'day')
  );
  const endOfDateFilter = filterBeforeDate(
    resourceDateProperty,
    dayjs(date).add(2, 'day')
  );
  return [startOfDateFilter, endOfDateFilter];
};

export const buildTimeEntriesFilter = (date, userId) => {
  const ownerAndUserId = `ownerId=='${userId}'`;

  const startDateFilterCondition = joinAndConditions(
    ownerAndUserId,
    ...filterTimeEntriesOnDate('actualStartTime', date)
  );

  const endDateFilterCondition = joinAndConditions(
    ownerAndUserId,
    ...filterTimeEntriesOnDate('actualEndTime', date)
  );

  const joinedStartEndDate = joinOrConditions(
    startDateFilterCondition,
    endDateFilterCondition
  );

  return joinedStartEndDate;
};
