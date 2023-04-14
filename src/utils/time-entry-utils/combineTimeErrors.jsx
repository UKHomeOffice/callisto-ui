import TimeInputErrors from '../../components/timecard/time-input-errors/TimeInputErrors';
import { clashingProperties, inputNames } from '../constants';

export function combineExistingAndTimeClashErrors(
  summaryErrors,
  clashingProperty,
  clashingTimes,
  timePeriodTypesMap
) {
  const combinedErrors = [...summaryErrors];

  if (clashingProperty === clashingProperties.startAndEndTime) {
    combinedErrors.push({
      key: 'startTimeClash',
      inputName: inputNames.shiftStartTime,
      message: clashErrorMessage(
        clashingProperty,
        clashingTimes,
        timePeriodTypesMap
      ),
      errorPriority: 1,
    });

    combinedErrors.push({
      key: 'finishTimeClash',
      inputName: inputNames.shiftFinishTime,
      message: '',
      errorPriority: 2,
    });
  } else if (clashingProperty === clashingProperties.startTime) {
    combinedErrors.push({
      key: 'startTimeClash',
      inputName: inputNames.shiftStartTime,
      message: clashErrorMessage(
        clashingProperty,
        clashingTimes,
        timePeriodTypesMap
      ),
      errorPriority: 1,
    });
  } else if (clashingProperty === clashingProperties.endTime) {
    combinedErrors.push({
      key: 'finishTimeClash',
      inputName: inputNames.shiftFinishTime,
      message: '',
      errorPriority: 1,
    });
  }

  return combinedErrors;
}

function clashErrorMessage(
  clashingProperty,
  clashingTimes,
  timePeriodTypesMap
) {
  return {
    message: (
      <TimeInputErrors
        clashingProperty={clashingProperty}
        clashes={clashingTimes}
        timePeriodTypesMap={timePeriodTypesMap}
      />
    ),
  };
}
