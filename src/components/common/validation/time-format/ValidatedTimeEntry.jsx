import PropTypes from 'prop-types';

const ValidatedTimeEntry = ({
  name,
  timeType,
  errors,
  defaultValue,
  register,
  isRequired,
}) => {
  const validateTime = (time) => {
    if (time.length < 3 && time.length > 0) {
      const timeRegEx = /^(\d|[01]\d|2[0-3])$/;
      return timeRegEx.test(time);
    } else if (time.length > 3 && time.length < 6) {
      const timeRegEx = /^([01]\d|2[0-3]):?([0-5]\d)$/;
      return timeRegEx.test(time);
    } else if (time.length == 0 && timeType === 'finish time') {
      console.log('here');
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
      {...register(name, {
        required: {
          value: isRequired,
          message: errorMessage,
        },
        validate: {
          validateTimeEntry: (v) => validateTime(v) || errorMessage,
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
};
