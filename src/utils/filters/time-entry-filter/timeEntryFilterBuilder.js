import dayjs from 'dayjs';
import {
  filterOnOrAfterDate,
  filterBeforeDate,
  joinOrConditions,
  joinAndConditions,
} from '../resource-filter-builder/resourceFilterBuilder';

const includeExtraDay = 1;
const includeTwoExtraDays = 2;

const filterStartTimeEntriesOnDate = (resourceDateProperty, date) => {
  const startOfDateFilter = filterOnOrAfterDate(
    resourceDateProperty,
    dayjs(date).subtract(includeExtraDay, 'day')
  );
  const endOfDateFilter = filterBeforeDate(
    resourceDateProperty,
    dayjs(date).add(includeExtraDay, 'day')
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
    dayjs(date).add(includeTwoExtraDays, 'day')
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
