import PropTypes from 'prop-types';

const ValidatedTimeEntry = ({
  name,
  timeType,
  errors,
  defaultValue,
  register,
  isRequired,
}) => {
  const errorMessage = `You must enter a ${timeType} in the HH:MM 24 hour clock format`;
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
};
