import PropTypes from 'prop-types';
import { useTimecardContext } from '../../../../context/TimecardContext';
import { deepCloneJson } from '../../../../utils/common-utils/common-utils';
import { inputNames } from '../../../../utils/constants';
import { ContextTimeEntry } from '../../../../utils/time-entry-utils/ContextTimeEntry';
import { isFinishTimeOnNextDay } from '../../../../utils/time-entry-utils/timeEntryUtils';

const ValidatedTimeEntry = ({
  name,
  timeType,
  errors,
  defaultValue,
  register,
  isRequired,
  getFormValues,
  timeEntry,
  timeEntriesIndex,
}) => {
  const { timeEntries, setTimeEntries } = useTimecardContext();

  const setFinishTimeText = () => {
    const startTimeValue = getFormValues(inputNames.shiftStartTime);
    const finishTimeValue = getFormValues(inputNames.shiftFinishTime);
    const newTimeEntries = deepCloneJson(timeEntries);

    const answer = isFinishTimeOnNextDay(startTimeValue, finishTimeValue);

    newTimeEntries[timeEntriesIndex] =
      ContextTimeEntry.createFrom(timeEntry).setFinishNextDay(answer);
    setTimeEntries(newTimeEntries);
  };

  const isTimeValid = (time) => {
    if (time.length < 3 && time.length > 0) {
      const hhTimeRegEx = /^(\d|[01]\d|2[0-3])$/;
      return hhTimeRegEx.test(time);
    } else if (time.length > 3 && time.length < 6) {
      const hhmmTimeRegEx = /^([01]\d|2[0-3]):?([0-5]\d)$/;
      return hhmmTimeRegEx.test(time);
    } else if (time.length == 0 && timeType === 'finish time') {
      return true;
    } else {
      return false;
    }
  };

  const errorMessage = `Enter a ${timeType} in the 24 hour clock format, for example, 08:00 or 0800`;

  return (
    <input
      id={name}
      name={name}
      className={`govuk-input ${
        Object.keys(errors).length !== 0 &&
        Object.keys(errors).find((error) => {
          return error === name;
        })
          ? 'govuk-input--error'
          : ''
      } govuk-input--width-5`}
      defaultValue={defaultValue}
      data-testid={name}
      autoComplete="off"
      type="text"
      {...register(name, {
        onBlur: () => setFinishTimeText(),
        required: {
          value: isRequired,
          message: errorMessage,
        },
        validate: {
          validateTimeEntry: (value) => isTimeValid(value) || errorMessage,
        },
      })}
    />
  );
};

export default ValidatedTimeEntry;

ValidatedTimeEntry.propTypes = {
  name: PropTypes.string.isRequired,
  timeType: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  register: PropTypes.any.isRequired,
  isRequired: PropTypes.bool,
  formState: PropTypes.any,
  getFormValues: PropTypes.func.isRequired,
  timeEntry: PropTypes.object.isRequired,
  timeEntriesIndex: PropTypes.number.isRequired,
};
