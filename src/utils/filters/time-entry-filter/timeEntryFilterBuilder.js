import dayjs from 'dayjs';
import {
  filterOnOrAfterDate,
  filterBeforeDate,
  joinOrConditions,
  joinAndConditions,
} from '../resource-filter-builder/resourceFilterBuilder';

export const filterTimeEntriesOnDate = (resourceDateProperty, date) => {
  const startOfDateFilter = filterOnOrAfterDate(resourceDateProperty, date);
  const endOfDateFilter = filterBeforeDate(
    resourceDateProperty,
    dayjs(date).add(1, 'day')
  );
  return [startOfDateFilter, endOfDateFilter];
};

export const buildTimeCardFilter = (date, userId) => {
  const startDateFilterCondition = joinAndConditions(
    ...filterTimeEntriesOnDate('actualStartTime', date)
  );

  const endDateFilterCondition = joinAndConditions(
    ...filterTimeEntriesOnDate('actualEndTime', date)
  );

  const joinedStartEndDate = joinOrConditions(
    startDateFilterCondition,
    endDateFilterCondition
  );

  const timeCardFilter = joinAndConditions(
    "ownerId=='" + userId,
    joinedStartEndDate
  );
  console.log(timeCardFilter);
  return timeCardFilter;
};
