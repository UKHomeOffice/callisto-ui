import PropTypes from 'prop-types';
import { useEffect } from 'react';

const ValidatedTimeEntry = ({
  name,
  errors,
  defaultValue,
  register,
  updateDynamicText,
}) => {
  useEffect(() => {
    updateDynamicText();
  }, []);
  return (
    <input
      id={name}
      name={name}
      className={`govuk-input ${
        Object.keys(errors).length !== 0 &&
        Object.values(errors).some((error) => error.inputName === name)
          ? 'govuk-input--error'
          : ''
      } govuk-input--width-5`}
      defaultValue={defaultValue}
      data-testid={name}
      autoComplete="off"
      type="text"
      {...register(name, {
        onChange: () => updateDynamicText(),
      })}
    />
  );
};

export default ValidatedTimeEntry;

ValidatedTimeEntry.propTypes = {
  name: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
  defaultValue: PropTypes.string,
  register: PropTypes.any.isRequired,
  updateDynamicText: PropTypes.func,
};
