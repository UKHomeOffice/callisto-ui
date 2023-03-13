import dayjs from 'dayjs';
import {
  filterOnOrAfterDate,
  filterBeforeDate,
  joinOrConditions,
  joinAndConditions,
} from '../resource-filter-builder/resourceFilterBuilder';

const filterStartTimeEntriesOnDate = (resourceDateProperty, date) => {
  const startOfDateFilter = filterOnOrAfterDate(
    resourceDateProperty,
    dayjs(date).subtract(1, 'day')
  );
  const endOfDateFilter = filterBeforeDate(
    resourceDateProperty,
    dayjs(date).add(1, 'day')
  );
  return [startOfDateFilter, endOfDateFilter];
};

const filterEndTimeEntriesOnDate = (resourceDateProperty, date) => {
  const startOfDateFilter = filterOnOrAfterDate(
    resourceDateProperty,
    dayjs(date)
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
    ...filterStartTimeEntriesOnDate('actualStartTime', date)
  );

  const endDateFilterCondition = joinAndConditions(
    ownerAndUserId,
    ...filterEndTimeEntriesOnDate('actualEndTime', date)
  );

  const joinedStartEndDate = joinOrConditions(
    startDateFilterCondition,
    endDateFilterCondition
  );

  return joinedStartEndDate;
};
