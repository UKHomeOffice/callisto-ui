import TimeInputErrors from '../../components/timecard/time-input-errors/TimeInputErrors';
import { clashingProperties, inputNames } from '../constants';

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
    combinedErrors[inputNames.shiftStartTime] = clashErrorMessage(
      clashingProperty,
      clashingTimes
    );
    combinedErrors[inputNames.shiftFinishTime] = {
      message: '',
    };
  } else if (clashingProperty === clashingProperties.startTime) {
    combinedErrors[inputNames.shiftStartTime] = clashErrorMessage(
      clashingProperty,
      clashingTimes
    );
  } else if (clashingProperty === clashingProperties.endTime) {
    combinedErrors[inputNames.shiftFinishTime] = clashErrorMessage(
      clashingProperty,
      clashingTimes
    );
  }

  return combinedErrors;
}

function clashErrorMessage(clashingProperty, clashingTimes) {
  return {
    message: (
      <TimeInputErrors
        clashingProperty={clashingProperty}
        clashes={clashingTimes}
      />
    ),
  };
}
