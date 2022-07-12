import PropTypes from 'prop-types';
import React from 'react';

const Radios = React.forwardRef(
  (
    {
      name,
      heading,
      headingSize,
      options,
      hint,
      value,
      errors,
      onChange,
      defaultValue = options[0],
      inline,
    },
    ref
  ) => {
    return (
      <>
        <div
          className={`govuk-form-group ${
            errors && errors[name] && 'govuk-form-group--error'
          }`}
          data-testid="radio-buttons"
        >
          <fieldset
            className="govuk-fieldset"
            aria-describedby={errors && errors[name] && `${name}-error`}
          >
            <legend
              className={`govuk-fieldset__legend govuk-fieldset__legend--${headingSize}`}
            >
              <h1 className="govuk-fieldset__heading">{heading}</h1>
            </legend>
            <div id="contact-hint" className="govuk-hint">
              {hint}
            </div>
            {errors && errors[name] && (
              <p id={`${name}-error`} className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>{' '}
                {errors[name].message}
              </p>
            )}
            <div
              className={`govuk-radios ${inline && 'govuk-radios--inline'}`}
              data-module="govuk-radios"
              data-testid="govuk-inline-radios"
            >
              <div key="0" className="govuk-radios__item">
                <input
                  className="govuk-radios__input"
                  id={name}
                  name={name}
                  type="radio"
                  value={options[0]}
                  onChange={onChange}
                  ref={ref}
                  defaultChecked={value === defaultValue}
                />
                <label
                  className="govuk-label govuk-radios__label"
                  htmlFor={name}
                >
                  {options[0]}
                </label>
              </div>

              {options.slice(1).map((radioLabel, index) => (
                <div key={index + 1} className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id={`${name}-${index}`}
                    name={name}
                    type="radio"
                    value={radioLabel}
                    onChange={onChange}
                    ref={ref}
                    defaultChecked={value === radioLabel}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor={`${name}-${index}`}
                  >
                    {radioLabel}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </>
    );
  }
);
export default Radios;

Radios.displayName = 'Radios';
Radios.propTypes = {
  name: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  headingSize: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  hint: PropTypes.string,
  value: PropTypes.string,
  errors: PropTypes.any,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  inline: PropTypes.bool,
};
