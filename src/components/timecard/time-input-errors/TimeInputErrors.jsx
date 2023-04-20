import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';
import { clashingProperties } from '../../../utils/constants';
import {
  formatLongDate,
  formatTime,
} from '../../../utils/time-entry-utils/timeEntryUtils';

const displayClashingProperty = (clashingProperty) => {
  if (clashingProperty === clashingProperties.startTime) {
    return 'Your start time must not overlap with another time period';
  }

  if (clashingProperty === clashingProperties.endTime) {
    return 'Your finish time must not overlap with another time period';
  }

  return 'Your start and finish times must not overlap with another time period';
};

const displaySingleTimeClash = (clashes, timePeriodTypesMap) => {
  if (clashes.length === 0) {
    throw new Error(
      'The time clashes data did not contain at least one time clash.'
    );
  }
  const clash = clashes[0];
  let fieldErrorSummary;
  let clashMessages = [];

  const timePeriodType = timePeriodTypesMap[clash.timePeriodTypeId];

  if (timePeriodType === 'Shift') {
    fieldErrorSummary = 'You are already assigned to work from:';
    clashMessages.push(
      `${formatStartDateTime(clash.startTime)} ${getEndTimeText(clash.endTime)}`
    );
  } else {
    fieldErrorSummary = 'You are already assigned a:';
    clashMessages.push(
      `${timePeriodType.toLowerCase()} on ${formatLongDate(clash.startTime)}`
    );
  }

  return {
    fieldErrorSummary: fieldErrorSummary,
    clashMessages: clashMessages,
  };
};

const displayMultipleTimeClashes = (clashes, timePeriodTypesMap) => {
  sortByStartTime(clashes);

  const clashMessages = [];
  clashes.map((clash) => {
    clashMessages.push(timePeriodClashToText(clash, timePeriodTypesMap));
  });

  return {
    fieldErrorSummary:
      'You are already assigned to the following time periods:',
    clashMessages: clashMessages,
  };
};

const sortByStartTime = (clashes) => {
  return clashes.sort(
    (a, b) => Date.parse(a.startTime) - Date.parse(b.startTime)
  );
};

const timePeriodClashToText = (clash, timePeriodTypesMap) => {
  const timePeriodType = timePeriodTypesMap[clash.timePeriodTypeId];

  if (timePeriodType === 'Shift') {
    return `${formatStartDateTime(clash.startTime)} ${getEndTimeText(
      clash.endTime
    )}`;
  }

  return `${timePeriodType.toLowerCase()} on ${formatLongDate(
    clash.startTime
  )}`;
};

const getEndTimeText = (endTime) => {
  return endTime
    ? `to ${formatTime(endTime)} on ${formatLongDate(endTime)}`
    : '';
};

const formatStartDateTime = (clash) => {
  let startDate = '';

  if (!dayjs(clash.startTime).isSame(clash.endTime, 'day')) {
    startDate = ` on ${formatLongDate(clash.startTime)}`;
  }

  return `${formatTime(clash.startTime)}${startDate}`;
};

export const createClashErrorsObject = (
  clashingProperty,
  clashes,
  timePeriodTypesMap
) => {
  return {
    summaryMessage: displayClashingProperty(clashingProperty),
    clashMessages:
      clashes.length > 1
        ? displayMultipleTimeClashes(clashes, timePeriodTypesMap)
        : displaySingleTimeClash(clashes, timePeriodTypesMap),
  };
};
