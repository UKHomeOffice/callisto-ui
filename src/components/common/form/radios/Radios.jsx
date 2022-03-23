import PropTypes from "prop-types";

const Radios = ({
  name,
  heading,
  headingSize,
  options,
  hint,
  errorMessage,
}) => {
  return (
    <>
      <div
        className={`govuk-form-group ${
          errorMessage && "govuk-form-group--error"
        }`}
        data-testid="radio-buttons"
      >
        <fieldset className="govuk-fieldset" aria-describedby={`${name}-error`}>
          <legend
            className={`govuk-fieldset__legend govuk-fieldset__legend--${headingSize}`}
          >
            <h1 className="govuk-fieldset__heading">{heading}</h1>
          </legend>
          <div id="contact-hint" className="govuk-hint">
            {hint}
          </div>
          {errorMessage && (
            <p id={`${name}-error`} className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span>{" "}
              {errorMessage}
            </p>
          )}
          <div className="govuk-radios" data-module="govuk-radios">
            {options.map((radioLabel, index) => (
              <div key={index} className="govuk-radios__item">
                <input
                  className="govuk-radios__input"
                  id={`${name}-${index}`}
                  name={`${name}-${index}`}
                  type="radio"
                  value={radioLabel}
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
};
export default Radios;

Radios.propTypes = {
  name: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  headingSize: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  hint: PropTypes.string,
  errorMessage: PropTypes.string,
};
