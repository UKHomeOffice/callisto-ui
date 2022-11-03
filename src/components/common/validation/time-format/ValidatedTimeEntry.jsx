import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useTimecardContext } from '../../../../context/TimecardContext';
import { deepCloneJson } from '../../../../utils/common-utils/common-utils';
import { ContextTimeEntry } from '../../../../utils/time-entry-utils/ContextTimeEntry';
import { isFinishTimeOnNextDay } from '../../../../utils/time-entry-utils/timeEntryUtils';

const ValidatedTimeEntry = ({
  name,
  timeType,
  errors,
  defaultValue,
  register,
  isRequired,
  formState,
  getValues,
  timeEntry,
  timeEntriesIndex,
}) => {
  const errorMessage = `You must enter a ${timeType} in the HH:MM 24 hour clock format`;

  const { timeEntries, setTimeEntries } = useTimecardContext();

  useEffect(() => {
    setFinishTimeText();
  }, [formState]);

  const setFinishTimeText = () => {
    const startTimeValue = getValues('shift-start-time');
    const finishTimeValue = getValues('shift-finish-time');
    const newTimeEntries = deepCloneJson(timeEntries);

    var answer = isFinishTimeOnNextDay(startTimeValue, finishTimeValue);

    newTimeEntries[timeEntriesIndex] =
      ContextTimeEntry.createFrom(timeEntry).setFinishNextDay(answer);
    // setTimeEntries(newTimeEntries);
  };

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
        pattern: {
          value: /^([01]\d|2[0-3]):?([0-5]\d)$/,
          message: errorMessage,
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
  getValues: PropTypes.func,
  timeEntry: PropTypes.object,
  timeEntriesIndex: PropTypes.number.isRequired,
};
