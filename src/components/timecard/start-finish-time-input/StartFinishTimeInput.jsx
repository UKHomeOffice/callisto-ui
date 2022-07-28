import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ValidatedTimeEntry from '../../common/validation/time-format/ValidatedTimeEntry';

const StartFinishTimeInput = ({
  name,
  errors,
  startTimeValue,
  finishTimeValue,
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
    <div
      className={`govuk-form-group ${
        errorMessages.length > 0 && 'govuk-form-group--error'
      }`}
    >
      <div className="govuk-grid-row">
        {errorMessages &&
          errorMessages.map((error, i) => (
            <p
              id={`${name}-error`}
              key={i}
              className="govuk-error-message govuk-!-margin-left-3"
            >
              <span className="govuk-visually-hidden">Error:</span>
              {error}
            </p>
          ))}
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <h1 className="govuk-label-wrapper">
            <label
              className={`govuk-label govuk-label--s`}
              htmlFor={`${name}-start-time`}
            >
              Start time
            </label>
          </h1>
          <div id={`${name}-start-time-hint`} className="govuk-hint">
            For example, 08:00
          </div>
          <ValidatedTimeEntry
            name={`${name}-start-time`}
            timeType="start time"
            errors={errors}
            defaultValue={startTimeValue}
            register={register}
          />
        </div>

        <div className="govuk-grid-column-one-third">
          <div className={`govuk-form-group`}>
            <h1 className="govuk-label-wrapper">
              <label
                className={`govuk-label govuk-label--s`}
                htmlFor={`${name}-finish-time`}
              >
                Finish time
              </label>
            </h1>
            <div id={`${name}-finish-time-hint`} className="govuk-hint">
              For example, 16:00
            </div>
            <input
              className={`govuk-input govuk-input--width-5`}
              id={`${name}-finish-time`}
              name={`${name}-finish-time`}
              type="text"
              defaultValue={finishTimeValue}
              data-testid="finish-time-input"
              {...register(name + '-finish-time')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartFinishTimeInput;

StartFinishTimeInput.propTypes = {
  name: PropTypes.string,
  errors: PropTypes.any.isRequired,
  startTimeValue: PropTypes.string,
  finishTimeValue: PropTypes.string,
  register: PropTypes.any.isRequired,
  formState: PropTypes.any,
};
