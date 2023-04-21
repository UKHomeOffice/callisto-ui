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
  register,
  updateFinishTimeText,
  finishTimeText,
}) => {
  useEffect(() => {
    updateFinishTimeText();
  }, []);

  const formatErrorDisplay = (error) => {
    if (
      error.key === 'overlappingStart' ||
      error.key === 'overlappingFinish' ||
      error.key === 'bothDatesOverlapping'
    ) {
      return (
        <>
          <p>{error.message.summaryMessage}</p>
          <div>
            <p>{error.message.clashMessages.fieldErrorSummary}</p>
            <ul>
              {error.message.clashMessages.clashMessages.map(
                (message, index) => (
                  <li key={index} data-testid="test">
                    {message}
                  </li>
                )
              )}
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <>
          <span className="govuk-visually-hidden">Error:</span>
          {error.message}
        </>
      );
    }
  };

  return (
    <div
      className={`govuk-form-group ${
        errors.length > 0 &&
        Object.values(errors).some(
          (error) =>
            error.inputName === 'shift-start-time' ||
            error.inputName === 'shift-end-time'
        )
          ? 'govuk-form-group--error'
          : ''
      }`}
    >
      <div className="govuk-error-summary__body" data-testid="error-box">
        {sortErrors(errors).map((error) => {
          return (
            <>
              <div
                id={`${name}-${error.key}-error`}
                key={error.key}
                className="govuk-error-message govuk-!-margin-bottom-0"
              >
                {error.message && <>{formatErrorDisplay(error)}</>}
              </div>
              <br />
            </>
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
            updateFinishTimeText={updateFinishTimeText}
          />
        </div>

        <div className="govuk-grid-column-one-third">
          <div className="govuk-form-group ">
            <label
              className="govuk-label govuk-label--s"
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
  register: PropTypes.any.isRequired,
  updateFinishTimeText: PropTypes.func,
  finishTimeText: PropTypes.string,
};
