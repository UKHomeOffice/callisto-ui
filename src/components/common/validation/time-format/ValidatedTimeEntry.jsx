import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const ValidatedTimeEntry = ({
  name,
  timeType,
  defaultValue,
  register,
  isRequired,
}) => {

  const {
    formState: { errors },
    setError
  } = useForm();

  const errorMessage =
    'You must enter a ' + timeType + ' in the HH:MM 24 hour clock format';

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
          value: isRequired
        },
        pattern: {
          value: /^([01]\d|2[0-3]):?([0-5]\d)$/ 
        },
      })}
      {...setError(name, {type: "timeValidationError", message: errorMessage})}
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
