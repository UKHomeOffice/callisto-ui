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
    let error = summaryErrors.find(
      (error) => error.key === 'bothDatesOverlapping'
    );
    if (error) {
      error.message = clashErrorMessage(
        clashingProperty,
        clashingTimes,
        timePeriodTypesMap
      );

      const index = summaryErrors.indexOf(error);
      combinedErrors = [
        ...combinedErrors.slice(0, index),
        error,
        ...combinedErrors.slice(index + 1),
      ];
    }

    // combinedErrors.push({
    //   key: 'startTimeClash',
    //   inputName: inputNames.shiftStartTime,
    //   message: clashErrorMessage(
    //     clashingProperty,
    //     clashingTimes,
    //     timePeriodTypesMap
    //   ),
    //   errorPriority: 1,
    // });

    combinedErrors.push({
      key: 'overlappingFinish',
      inputName: inputNames.shiftFinishTime,
      message: '',
      errorPriority: 2,
    });
  } else if (clashingProperty === clashingProperties.startTime) {
    let error = summaryErrors.find((error) => error.key === 'overlappingStart');
    if (error) {
      error.message = clashErrorMessage(
        clashingProperty,
        clashingTimes,
        timePeriodTypesMap
      );

      const index = summaryErrors.indexOf(error);
      combinedErrors = [
        ...combinedErrors.slice(0, index),
        error,
        ...combinedErrors.slice(index + 1),
      ];
    }

    // combinedErrors.push({
    //   key: 'startTimeClash',
    //   inputName: inputNames.shiftStartTime,
    //   message: clashErrorMessage(
    //     clashingProperty,
    //     clashingTimes,
    //     timePeriodTypesMap
    //   ),
    //   errorPriority: 1,
    // });
  } else if (clashingProperty === clashingProperties.endTime) {
    let error = summaryErrors.find(
      (error) => error.key === 'overlappingFinish'
    );
    if (error) {
      error.message = clashErrorMessage(
        clashingProperty,
        clashingTimes,
        timePeriodTypesMap
      );

      const index = summaryErrors.indexOf(error);
      combinedErrors = [
        ...combinedErrors.slice(0, index),
        error,
        ...combinedErrors.slice(index + 1),
      ];
    }

    // combinedErrors.push({
    //   key: 'finishTimeClash',
    //   inputName: inputNames.shiftFinishTime,
    //   message: clashErrorMessage(
    //     clashingProperty,
    //     clashingTimes,
    //     timePeriodTypesMap
    //   ),
    //   errorPriority: 1,
    // });
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
