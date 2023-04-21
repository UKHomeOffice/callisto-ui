import { createClashErrorsObject } from '../../components/timecard/time-input-errors/TimeInputErrors';
import { clashingProperties, inputNames } from '../constants';

export function combineExistingAndTimeClashErrors(
  summaryErrors,
  clashingProperty,
  clashingTimes,
  timePeriodTypesMap
) {
  let combinedErrors = [...summaryErrors];

  if (clashingProperty === clashingProperties.startAndEndTime) {
    let index = summaryErrors.findIndex(
      (error) => error.key === 'bothDatesOverlapping'
    );
    const error = {
      key: 'bothDatesOverlapping',
      inputName: 'shift-start-time',
      message: clashErrorMessage(
        clashingProperty,
        clashingTimes,
        timePeriodTypesMap
      ),
      errorPriority: 1,
    };

    combinedErrors = [
      ...combinedErrors.slice(0, index),
      error,
      ...combinedErrors.slice(index + 1),
    ];

    combinedErrors.push({
      key: 'overlappingFinish',
      inputName: inputNames.shiftFinishTime,
      message: '',
      errorPriority: 2,
    });
  } else if (clashingProperty === clashingProperties.startTime) {
    let index = summaryErrors.findIndex(
      (error) => error.key === 'overlappingStart'
    );
    const error = {
      key: 'overlappingStart',
      inputName: 'shift-start-time',
      message: clashErrorMessage(
        clashingProperty,
        clashingTimes,
        timePeriodTypesMap
      ),
      errorPriority: 1,
    };

    combinedErrors = [
      ...combinedErrors.slice(0, index),
      error,
      ...combinedErrors.slice(index + 1),
    ];
  } else if (clashingProperty === clashingProperties.endTime) {
    let index = summaryErrors.findIndex(
      (error) => error.key === 'overlappingFinish'
    );
    const error = {
      key: 'overlappingFinish',
      inputName: 'shift-finish-time',
      message: clashErrorMessage(
        clashingProperty,
        clashingTimes,
        timePeriodTypesMap
      ),
      errorPriority: 1,
    };

    combinedErrors = [
      ...combinedErrors.slice(0, index),
      error,
      ...combinedErrors.slice(index + 1),
    ];
  }

  return combinedErrors;
}

function clashErrorMessage(
  clashingProperty,
  clashingTimes,
  timePeriodTypesMap
) {
  return createClashErrorsObject(
    clashingProperty,
    clashingTimes,
    timePeriodTypesMap
  );
}
