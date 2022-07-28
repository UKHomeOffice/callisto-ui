import PropTypes from 'prop-types';
import { validateTime } from '../../../../utils/validation/validate-time/validateTime';

const ValidatedTimeEntry = ({
  name,
  timeType,
  errors,
  defaultValue,
  register,
}) => {
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
      data-testid={name}
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
