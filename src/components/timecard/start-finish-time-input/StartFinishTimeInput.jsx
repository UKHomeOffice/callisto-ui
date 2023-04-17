import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ValidatedTimeEntry from '../../common/validation/time-format/ValidatedTimeEntry';
import { sortErrors } from '../../../utils/sort-errors/sortErrors';
import { inputNames } from '../../../utils/constants';
import { isFinishTimeOnNextDay } from '../../../utils/time-entry-utils/timeEntryUtils';
import dayjs from 'dayjs';

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
  localStartDate,
  setLocalEndDate,
}) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [finishTimeText, setFinishTimeText] = useState('');

  const desiredErrorOrder = [
    inputNames.shiftStartTime,
    inputNames.shiftFinishTime,
  ];

  useEffect(() => {
    // updateErrorMessages();
    updateFinishTimeText();
  }, []);

  const updateErrorMessages = () => {
    const findErrors =
      errors &&
      Object.values(errors).filter(
        (error) =>
          error.inputName === 'shift-start-time' ||
          error.inputName === 'shift-finish-time'
      );
    let relevantErrorMessages = [];
    if (findErrors) {
      relevantErrorMessages = findErrors.map((error) => {
        return error.message;
      });
    }
    setErrorMessages(relevantErrorMessages);
  };

  const updateFinishTimeText = () => {
    const startTime = getFormValues(inputNames.shiftStartTime);
    const finishTime = getFormValues(inputNames.shiftFinishTime);
    const nextDay = isFinishTimeOnNextDay(startTime, finishTime);
    setFinishTimeText(nextDay ? 'Finishes next day' : '');
    setLocalEndDate(
      nextDay ? dayjs(localStartDate).add(1, 'day').toString : localStartDate
    );
  };

  return (
    <div
      className={`govuk-form-group ${
        errorMessages.length > 0 &&
        Object.values(errors).some(
          (error) =>
            error.inputName === 'shift-start-time' ||
            error.inputName === 'shift-end-time'
        )
          ? 'govuk-form-group--error'
          : ''
      }`}
    >
      {/* kinda works, need to fix the error messages so the correct one is displayed */}
      {/* <div className="govuk-grid-row" data-testid="error-box">
        {errorMessages.map((message, i) => (
          <div
            id={`${name}-${i}-error`}
            key={i}
            className="govuk-error-message govuk-!-margin-left-3"
          >
            <span className="govuk-visually-hidden">Error:</span>
            {message}
          </div>
        ))}
      </div> */}

      <div className="govuk-grid-row" data-testid="error-box">
        {sortErrors(errors).map((error) => {
          return (
            <div
              id={`${name}-${error.key}-error`}
              key={error.key}
              className="govuk-error-message govuk-!-margin-left-3"
            >
              {error.message && (
                <div>
                  <span className="govuk-visually-hidden">Error:</span>
                  {error.message}
                </div>
              )}
            </div>
          );
        })}
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
          <div className="govuk-form-group ">
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
  errors: PropTypes.array.isRequired,
  startTimeValue: PropTypes.string,
  finishTimeValue: PropTypes.string,
  getFormValues: PropTypes.func.isRequired,
  timeEntry: PropTypes.object.isRequired,
  timeEntriesIndex: PropTypes.number.isRequired,
  register: PropTypes.any.isRequired,
  formState: PropTypes.any,
};
