import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const Radios = ({
  name,
  heading,
  headingSize,
  options,
  hint,
  errors,
  value,
  handleRadiosChange,
}) => {
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    updateErrorMessage()
  }, [errors])

  const updateErrorMessage = () => {
    const findError = errors?.find((error) => error.inputName === name)
    const newErrorMessage = findError ? findError.message : ''
    setErrorMessage(newErrorMessage)
  }

  return (
    <>
      <div
        className={`govuk-form-group ${
          errorMessage && 'govuk-form-group--error'
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
              <span className="govuk-visually-hidden">Error:</span>{' '}
              {errorMessage}
            </p>
          )}
          <div className="govuk-radios" data-module="govuk-radios">
            <div key="0" className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id={name}
                name={name}
                type="radio"
                value={options[0]}
                onChange={(event) => {
                  handleRadiosChange(event)
                }}
                checked={value === options[0] && 'checked'}
              />
              <label className="govuk-label govuk-radios__label" htmlFor={name}>
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
                  onChange={(event) => {
                    handleRadiosChange(event)
                  }}
                  checked={value === radioLabel && 'checked'}
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
  )
}
export default Radios

Radios.propTypes = {
  name: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  headingSize: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  hint: PropTypes.string,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      inputName: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.string,
  handleRadiosChange: PropTypes.func,
}
