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
            {dayValue &&
              <DateInputItem name={name} dateType="day" errors={errors} defaultValue={dayValue} pattern={/^([1-9]|0[1-9]|[12][\d]|3[01])$/}
              register={register}/>
            }

            {monthValue &&
              <DateInputItem name={name} dateType="month" errors={errors} defaultValue={monthValue} pattern={/^([1-9]|[0][1-9]|1[012])$/}
              register={register}/>
            }

            {yearValue &&
              <DateInputItem name={name} dateType="year" errors={errors} defaultValue={yearValue} pattern={/^\d{4}$/} 
              register={register}/>
            }
          </div>
        </fieldset>
      </div>
    </>
  );
};

const DateInputItem = ({name, dateType, errors, defaultValue, pattern, register}) => {

  const capitilisedName = dateType[0].toUpperCase() + dateType.substring(1);

  return (
    <div className="govuk-date-input__item">
      <div className="govuk-form-group">
        <label
          className="govuk-label govuk-date-input__label"
          htmlFor={`${name}-${dateType}`}
        >
          {capitilisedName}
        </label>
        <input
          className={`govuk-input govuk-date-input__input govuk-input--width-2 ${
            errors &&
            Object.keys(errors).find((error) => {
              return error === name + '-' + dateType;
            }) &&
            'govuk-input--error'
          }`}
          id={`${name}-${dateType}`}
          name={`${name}-${dateType}`}
          type="text"
          inputMode="numeric"
          data-testid="${dateType}-input"
          defaultValue={defaultValue}
          {...register(name + '-' + dateType, {
            required: {
              value: true,
              message: 'Enter a ' + dateType,
            },
            pattern: {
              value: pattern,
              message: 'Enter a valid ' + dateType,
            },
          })}
        />
      </div>
    </div>
  )

}

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
