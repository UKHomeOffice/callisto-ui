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
