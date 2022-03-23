import React from "react";
import PropTypes from "prop-types";

function DateInput({ name, heading, headingSize, hint, errors }) {
  return (
    <>
      <div
        className={`govuk-form-group ${errors && "govuk-form-group--error"}`}
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
          {errors &&
            errors.map((error, i) => (
              <p id={`${name}-error`} key={i} className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {error.message}
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
                    errors.find((error) => {
                      return error.inputName === name + "-day";
                    }) &&
                    "govuk-input--error"
                  }`}
                  id={`${name}-day`}
                  name={`${name}-day`}
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  data-testid="day-input"
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
                    errors.find((error) => {
                      return error.inputName === name + "-month";
                    }) &&
                    "govuk-input--error"
                  }`}
                  id={`${name}-month`}
                  name={`${name}-month`}
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  data-testid="month-input"
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
                    errors.find((error) => {
                      return error.inputName === name + "-year";
                    }) &&
                    "govuk-input--error"
                  }`}
                  id={`${name}-year`}
                  name={`${name}-year`}
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  data-testid="year-input"
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default DateInput;

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  headingSize: PropTypes.string.isRequired,
  hint: PropTypes.string,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      inputName: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ),
};
