import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import TimeInputErrors from '../../components/timecard/time-input-errors/TimeInputErrors';
import { deepCloneJson } from '../common-utils/common-utils';
import { clashingProperties, inputNames } from '../constants';

dayjs.extend(isSameOrBefore);

export const addTimePeriodHeading = 'Add time period';

export const getSingleTimeEntryResponseItem = (timeEntryResponseData) => {
  if (timeEntryResponseData.items && timeEntryResponseData.items.length > 0)
    return timeEntryResponseData.items[0];
  throw new Error(
    'The time entry response data did not contain at least one time entry.'
  );
};

export const formatTime = (time) => {
  return dayjs(time).format('HH:mm');
};

export const formatDate = (dateTime) => {
  return dayjs(dateTime).format('YYYY-MM-DD');
};

export const formatDateNoYear = (dateTime) => {
  return dayjs(dateTime).format('DD MMMM');
};

export const formatDateTimeISO = (dateTime) => {
  return dayjs(dateTime).format('YYYY-MM-DDTHH:mm:ssZ');
};

export const formatLongDate = (dateTime) => {
  return dayjs(dateTime).format('D MMMM YYYY');
};

export const removeTimecardContextEntry = (
  timeEntries,
  setTimeEntries,
  removeAtIndex
) => {
  const newTimeEntries = deepCloneJson(timeEntries);
  newTimeEntries.splice(removeAtIndex, 1);
  setTimeEntries(newTimeEntries);
};

export const getTimePeriodTypesMap = (timePeriodTypes) => {
  return timePeriodTypes.reduce(
    (acc, type) => ({ ...acc, [type.id]: type.name }),
    {}
  );
};

export const isFinishTimeOnNextDay = (startTimeValue, finishTimeValue) => {
  if (startTimeValue && finishTimeValue) {
    return dayjs(formatDate(dayjs()) + finishTimeValue).isSameOrBefore(
      dayjs(formatDate(dayjs()) + startTimeValue)
    );
  }
  return false;
};

export function combineExistingAndTimeClashErrors(
  errors,
  summaryErrors,
  clashingProperty,
  clashingTimes
) {
  const existingErrors =
    Object.keys(errors).length > 0 ? errors : summaryErrors;

  const combinedErrors = { ...existingErrors };

  if (clashingProperty === clashingProperties.startAndEndTime) {
    combinedErrors[inputNames.shiftStartTime] = {
      message: (
        <TimeInputErrors
          clashingProperty={clashingProperty}
          clashes={clashingTimes}
        />
      ),
    };
    combinedErrors[inputNames.shiftFinishTime] = {
      message: '',
    };
  } else if (clashingProperty === clashingProperties.startTime) {
    combinedErrors[inputNames.shiftStartTime] = {
      message: (
        <TimeInputErrors
          clashingProperty={clashingProperty}
          clashes={clashingTimes}
        />
      ),
    };
  } else if (clashingProperty === clashingProperties.endTime) {
    combinedErrors[inputNames.shiftFinishTime] = {
      message: (
        <TimeInputErrors
          clashingProperty={clashingProperty}
          clashes={clashingTimes}
        />
      ),
    };
  }

  return combinedErrors;
}
