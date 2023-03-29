import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ValidatedTimeEntry from '../../common/validation/time-format/ValidatedTimeEntry';
import { sortErrors } from '../../../utils/sort-errors/sortErrors';
import { inputNames } from '../../../utils/constants';
import { isFinishTimeOnNextDay } from '../../../utils/time-entry-utils/timeEntryUtils';

const StartFinishTimeInput = ({
  name,
  errors,
  startTimeValue,
  finishTimeValue,
  getFormValues,
  timeEntry,
  timeEntriesIndex,
  register,
  formState,
}) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [finishTimeText, setFinishTimeText] = useState('words');

  const desiredErrorOrder = [
    inputNames.shiftStartTime,
    inputNames.shiftFinishTime,
  ];

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

  const updateFinishTimeText = () => {
    const startTime = getFormValues(inputNames.shiftStartTime);
    const finishTime = getFormValues(inputNames.shiftFinishTime);
    setFinishTimeText(
      isFinishTimeOnNextDay(startTime, finishTime) ? 'Finishes next day' : ''
    );
  };

  return (
    <div
      className={`govuk-form-group ${
        errorMessages.length > 0 && 'govuk-form-group--error'
      }`}
    >
      <div className="govuk-grid-row" data-testid="error-box">
        {sortErrors(errors, desiredErrorOrder).map((error, i) => (
          <div
            id={`${name}-${i}-error`}
            key={i}
            className="govuk-error-message govuk-!-margin-left-3"
          >
            {errors[error]?.message && (
              <div>
                <span className="govuk-visually-hidden">Error:</span>
                {errors[error]?.message}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <label
            className="govuk-label govuk-label--s"
            htmlFor={`${name}-start-time`}
          >
            Start time
          </label>
          <div id={`${name}-start-time-hint`} className="govuk-hint">
            For example, 08:00
          </div>
          <ValidatedTimeEntry
            name={`${name}-start-time`}
            timeType="start time"
            errors={errors}
            defaultValue={startTimeValue}
            register={register}
            isRequired={true}
            getFormValues={getFormValues}
            timeEntry={timeEntry}
            timeEntriesIndex={timeEntriesIndex}
            updateFinishTimeText={updateFinishTimeText}
          />
        </div>

        <div className="govuk-grid-column-one-third">
          <div className="govuk-form-group">
            <label
              className="govuk-label govuk-label--s responsive-margin"
              htmlFor={`${name}-finish-time`}
            >
              Finish time
            </label>
            <div id={`${name}-finish-time-hint`} className="govuk-hint">
              For example, 16:00
            </div>
            <ValidatedTimeEntry
              name={`${name}-finish-time`}
              timeType="finish time"
              errors={errors}
              defaultValue={finishTimeValue}
              register={register}
              getFormValues={getFormValues}
              timeEntry={timeEntry}
              timeEntriesIndex={timeEntriesIndex}
              updateFinishTimeText={updateFinishTimeText}
            />
          </div>
        </div>
        <p
          id="end-next-day"
          className="govuk-hint govuk-grid-column-one-third govuk-!-padding-top-8 govuk-!-padding-right-0 govuk-!-padding-left-0"
        >
          {finishTimeText}
        </p>
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
  getFormValues: PropTypes.func.isRequired,
  timeEntry: PropTypes.object.isRequired,
  timeEntriesIndex: PropTypes.number.isRequired,
  register: PropTypes.any.isRequired,
  formState: PropTypes.any,
};
