import PropTypes from 'prop-types'

function Input({ name, heading, headingSize, inputWidth, hint, errorMessage }) {
  return (
    <>
      <div
        className={`govuk-form-group ${
          errorMessage && 'govuk-form-group--error'
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
        {errorMessage && (
          <p id={`${name}-error`} className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {errorMessage}
          </p>
        )}
        <input
          className={`govuk-input ${
            errorMessage && 'govuk-input--error'
          } govuk-input--width-${inputWidth}`}
          id={`${name}`}
          name={`${name}`}
          type="text"
          data-testid="input-box"
        />
      </div>
    </>
  )
}

export default Input

Input.propTypes = {
  name: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  headingSize: PropTypes.string.isRequired,
  inputWidth: PropTypes.string.isRequired,
  hint: PropTypes.string,
  errorMessage: PropTypes.string,
}
