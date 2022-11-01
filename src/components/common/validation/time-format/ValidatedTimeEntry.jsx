import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { calculateFinishTimeOnNextDay } from '../../../../utils/time-entry-utils/timeEntryUtils';

const ValidatedTimeEntry = ({
  name,
  timeType,
  errors,
  defaultValue,
  register,
  isRequired,
  formState,
}) => {
  const errorMessage = `You must enter a ${timeType} in the HH:MM 24 hour clock format`;

  useEffect(() => {
    isFinishTimeNextDay();
  }, [formState]);

  const isFinishTimeNextDay = () => {
    if (document.getElementById(`shift-finish-time`)) {
      var finishTimeValue = document.getElementById(`shift-finish-time`).value;
    }
    if (document.getElementById(`shift-start-time`)) {
      var startTimeValue = document.getElementById(`shift-start-time`).value;
    }
    var answer = calculateFinishTimeOnNextDay(startTimeValue, finishTimeValue);

    if (document.getElementById('end-next-day')) {
      if (answer >= 1) {
        document.getElementById('end-next-day').innerHTML =
          'Finishes on next day';
      } else {
        document.getElementById('end-next-day').innerHTML = '';
      }
    }
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
      {...register(name, {
        onBlur: () => isFinishTimeNextDay(),
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
  onBlur: PropTypes.bool,
};
