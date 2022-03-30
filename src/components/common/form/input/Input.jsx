import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const Input = React.forwardRef(
  (
    {
      name,
      heading,
      headingSize,
      inputWidth,
      hint,
      errors,
      value,
      onChange,
      // register,
    },
    ref
  ) => {
    // const [errorMessage, setErrorMessage] = useState('');

    // useEffect(() => {
    //   updateErrorMessage();
    // }, [errors]);

    // const updateErrorMessage = () => {
    //   const findError = errors?.find((error) => error.inputName === name);
    //   const newErrorMessage = findError ? findError.message : '';
    //   setErrorMessage(newErrorMessage);
    // };

    return (
      <>
        <div
          className={`govuk-form-group ${
            errors[name] && 'govuk-form-group--error'
          }`}
        >
          <h1 className="govuk-label-wrapper">
            <label
              className={`govuk-label govuk-label--${headingSize}`}
              htmlFor={name}
            >
              {heading}
            </label>
          </h1>
          {hint && (
            <div id={`${name}-hint`} className="govuk-hint">
              {hint}
            </div>
          )}
          {errors[name] && (
            <p id={`${name}-error`} className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span>
              {errors[name].message}
            </p>
          )}
          <input
            className={`govuk-input ${
              errors[name] && 'govuk-input--error'
            } govuk-input--width-${inputWidth}`}
            id={`${name}`}
            name={`${name}`}
            // value={value}
            type="text"
            onChange={onChange}
            data-testid="input-box"
            ref={ref}
          />
        </div>
      </>
    );
  }
);

export default Input;

Input.displayName = 'Input';
Input.propTypes = {
  name: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  headingSize: PropTypes.string.isRequired,
  inputWidth: PropTypes.string.isRequired,
  hint: PropTypes.string,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      inputName: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
  // register: PropTypes.any,
};
