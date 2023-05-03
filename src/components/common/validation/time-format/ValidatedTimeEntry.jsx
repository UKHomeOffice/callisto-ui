import PropTypes from 'prop-types';

const ValidatedTimeEntry = ({
  name,
  errors,
  defaultValue,
  register,
  updateTime,
  timeType,
}) => {
  let time = defaultValue;

  const updateTimeEntryTime = (e) => {
    console.log(e.target.value);
    time = e.target.value;
  };

  return (
    <input
      id={name}
      name={name}
      className={`govuk-input ${
        errors.length !== 0 && errors.some((error) => error.inputName === name)
          ? 'govuk-input--error'
          : ''
      } govuk-input--width-5`}
      defaultValue={defaultValue}
      data-testid={name}
      autoComplete="off"
      type="text"
      {...register(name, {
        onChange: (e) => updateTimeEntryTime(e),
        onBlur: () => updateTime(time, timeType),
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
  timeType: PropTypes.string,
  updateTime: PropTypes.func,
};
