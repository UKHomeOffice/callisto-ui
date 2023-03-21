import dayjs from 'dayjs';
import {
  filterOnOrAfterDate,
  filterBeforeDate,
  joinOrConditions,
  joinAndConditions,
} from '../resource-filter-builder/resourceFilterBuilder';

const startDateOffset = 1
const endDateOffset = 2;

const filterStartTimeEntriesOnDate = (resourceDateProperty, date) => {
  const startOfDateFilter = filterOnOrAfterDate(
    resourceDateProperty,
    dayjs(date).subtract(startDateOffset, 'day')
  );
  const endOfDateFilter = filterBeforeDate(
    resourceDateProperty,
    dayjs(date).add(startDateOffset, 'day')
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
    dayjs(date).add(endDateOffset, 'day')
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
