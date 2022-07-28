import PropTypes from 'prop-types';

const ValidatedTimeEntry = ({
  name,
  timeType,
  errors,
  defaultValue,
  register,
}) => {
  const validateTime = (time) => {
    console.log('validating');
    var timeRegEx = /^\d{2}:\d{2}$/;
    // If the time isn't in the correct format don't even bother running the rest of the validation
    if (timeRegEx.test(time)) {
      var hours = time.slice(0, 2);
      var minutes = time.slice(2);

      minutes = minutes.replace(':', '');

      if (hours > 23 || hours < 0) {
        return false;
      }
      if (minutes > 59 || minutes < 0) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  };

  const triggerValidation = (e) => {
    validateTime(e.target.value);
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
      onBlur={triggerValidation}
      {...register(name, {
        required: {
          value: true,
          message:
            'You must enter a ' +
            timeType +
            ' in the HH:MM 24 hour clock format',
        },
        validate: {
          validateTimeEntry: (v) =>
            validateTime(v) ||
            'You must enter a ' +
              timeType +
              ' in the HH:MM 24 hour clock format',
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
};
