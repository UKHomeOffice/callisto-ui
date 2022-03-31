import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const DateInput = ({
  name,
  heading,
  headingSize,
  hint,
  errors,
  dayValue,
  monthValue,
  yearValue,
  register,
  formState,
}) => {
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    updateErrorMessages();
  }, [formState]);

  const updateErrorMessages = () => {
    const findErrors =
      errors &&
      Object.keys(errors).filter((inputName) => inputName.includes(name));
    let relevantErrorMessages = [];
    if (findErrors) {
      relevantErrorMessages = findErrors.map((inputName) => {
        return errors[inputName].message;
      });
    }
    setErrorMessages(relevantErrorMessages);
  };

  return (
    <>
      <div
        className={`govuk-form-group ${
          errorMessages.length > 0 && 'govuk-form-group--error'
        }`}
      >
        <fieldset
          className="govuk-fieldset"
          role="group"
          aria-describedby={`${name}-hint`}
        >
          <legend
            className={`govuk-fieldset__legend govuk-fieldset__legend--${headingSize}`}
          >
            <h1 className="govuk-fieldset__heading">{heading}</h1>
          </legend>
          <div id={`${name}-hint`} className="govuk-hint">
            {hint}
          </div>
          {errorMessages &&
            errorMessages.map((error, i) => (
              <p id={`${name}-error`} key={i} className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> {error}
              </p>
            ))}

          <div className="govuk-date-input" id={name}>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label
                  className="govuk-label govuk-date-input__label"
                  htmlFor={`${name}-day`}
                >
                  Day
                </label>
                <input
                  className={`govuk-input govuk-date-input__input govuk-input--width-2 ${
                    errors &&
                    Object.keys(errors).find((error) => {
                      return error === name + '-day';
                    }) &&
                    'govuk-input--error'
                  }`}
                  id={`${name}-day`}
                  name={`${name}-day`}
                  type="text"
                  inputMode="numeric"
                  data-testid="day-input"
                  value={dayValue}
                  {...register(name + '-day', {
                    required: {
                      value: true,
                      message: 'Enter a day',
                    },
                    // min: { value: 1, message: 'Day must be at least 1' },
                    // max: {
                    //   value: 31,
                    //   message: 'Day must be less than 31',
                    // },
                  })}
                />
              </div>
            </div>

            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label
                  className="govuk-label govuk-date-input__label"
                  htmlFor={`${name}-month`}
                >
                  Month
                </label>
                <input
                  className={`govuk-input govuk-date-input__input govuk-input--width-2 ${
                    errors &&
                    Object.keys(errors).find((error) => {
                      return error === name + '-month';
                    }) &&
                    'govuk-input--error'
                  }`}
                  id={`${name}-month`}
                  name={`${name}-month`}
                  type="text"
                  inputMode="numeric"
                  data-testid="month-input"
                  value={monthValue}
                  {...register(name + '-month', {
                    required: {
                      value: true,
                      message: 'Enter a month',
                    },
                  })}
                />
              </div>
            </div>

            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label
                  className="govuk-label govuk-date-input__label"
                  htmlFor={`${name}-year`}
                >
                  Year
                </label>
                <input
                  className={`govuk-input govuk-date-input__input govuk-input--width-4 ${
                    errors &&
                    Object.keys(errors).find((error) => {
                      return error === name + '-year';
                    }) &&
                    'govuk-input--error'
                  }`}
                  id={`${name}-year`}
                  name={`${name}-year`}
                  type="text"
                  inputMode="numeric"
                  data-testid="year-input"
                  value={yearValue}
                  {...register(name + '-year', {
                    required: {
                      value: true,
                      message: 'Enter a year',
                    },
                  })}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default DateInput;

DateInput.displayName = 'DateInput';
DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  headingSize: PropTypes.string.isRequired,
  hint: PropTypes.string,
  errors: PropTypes.any,
  dayValue: PropTypes.string,
  monthValue: PropTypes.string,
  yearValue: PropTypes.string,
  register: PropTypes.any.isRequired,
  formState: PropTypes.any,
};
