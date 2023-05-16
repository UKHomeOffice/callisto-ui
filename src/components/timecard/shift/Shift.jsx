import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditShift from '../edit-shift/EditShift';
import { deleteTimeEntry } from '../../../api/services/timecardService';
import { UrlSearchParamBuilder } from '../../../utils/api-utils/UrlSearchParamBuilder';
import {
  formatDateNoYear,
  formatTime,
  formatDate,
  removeTimecardEntry,
} from '../../../utils/time-entry-utils/timeEntryUtils';
import { validateServiceErrors } from '../../../utils/api-utils/ApiUtils';
import { useApplicationContext } from '../../../context/ApplicationContext';
import dayjs from 'dayjs';

const Shift = ({
  summaryErrors,
  setSummaryErrors,
  timecardDate,
  timeEntry,
  timeEntriesIndex,
  timeEntries,
  setTimeEntries,
  summaryMessages,
  setSummaryMessages,
  timePeriodTypesMap,
}) => {
  const { setServiceError } = useApplicationContext();

  const timeEntryExists = !!timeEntry?.startTime && timeEntry.startTime !== '';
  const [showEditShift, setShowEditShift] = useState(!timeEntryExists);

  const toggleEditShift = (event) => {
    event.preventDefault();
    setShowEditShift(!showEditShift);
  };
  useEffect(() => {
    if (timeEntryExists === false) {
      setShowEditShift(true);
    }
  });

  const handleClickRemoveShiftButton = async (event) => {
    event.preventDefault();
    const params = new UrlSearchParamBuilder()
      .setTenantId('00000000-0000-0000-0000-000000000000')
      .getUrlSearchParams();

    setSummaryErrors([]);
    await validateServiceErrors(
      setServiceError,
      async () => {
        await deleteTimeEntry(timeEntry.timeEntryId, params);
        removeTimecardEntry(timeEntries, setTimeEntries, timeEntriesIndex);
      },
      true
    );
  };

  function renderShiftHoursText({
    timeEntryExists,
    timeEntry,
    formatTime,
    formatDateNoYear,
  }) {
    if (!timeEntryExists) {
      return null;
    }

    const startTime = timeEntry.startTime;
    const finishTime = timeEntry.finishTime;

    const shouldShowStartDate = dayjs(finishTime).isAfter(
      dayjs(startTime),
      'day'
    );
    const shouldShowLineBreak =
      finishTime && !dayjs(finishTime).isSame(startTime, 'day');

    return (
      <>
        {formatTime(startTime)}
        {shouldShowStartDate && <> on {formatDateNoYear(startTime)}</>} to{' '}
        {shouldShowLineBreak && <br />}
        {finishTime ? formatTime(finishTime) : '-'}
        {shouldShowStartDate && <> on {formatDateNoYear(finishTime)}</>}
      </>
    );
  }
  let timePeriodText = null;
  if (timeEntryExists && timecardDate === formatDate(timeEntry.startTime)) {
    timePeriodText = 'Shift';
  } else if (timeEntryExists) {
    timePeriodText = 'Shift (continued)';
  }

  return (
    <div className="grey-border">
      <dl className="govuk-summary-list govuk-!-margin-bottom-0">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key govuk-!-width-two-thirds">
            Time period
          </dt>
          <dd className="govuk-summary-list__value">{timePeriodText}</dd>
          <dd className="govuk-summary-list__actions">
            {timeEntryExists && (
              <Link
                onClick={handleClickRemoveShiftButton}
                className="govuk-link govuk-link--no-visited-state"
                to={'/'}
              >
                Remove<span className="govuk-visually-hidden"> shift</span>
              </Link>
            )}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Hours</dt>
          <dd className="govuk-summary-list__value govuk-!-width-full">
            {!showEditShift &&
              timeEntryExists &&
              renderShiftHoursText({
                timeEntryExists,
                timeEntry,
                formatTime,
                formatDateNoYear,
              })}
          </dd>
          <dd className="govuk-summary-list__actions">
            {timeEntryExists && (
              <Link
                onClick={toggleEditShift}
                className="govuk-link govuk-link--no-visited-state"
                to={'/'}
                data-testid="hours-change-button"
              >
                Edit<span className="govuk-visually-hidden"> hours</span>
              </Link>
            )}
          </dd>
        </div>
        {showEditShift && (
          <div className="govuk-summary-list__row govuk-summary-list__row--no-border">
            <dt className="govuk-summary-list__row">
              <EditShift
                summaryErrors={summaryErrors}
                setSummaryErrors={setSummaryErrors}
                timecardDate={timecardDate}
                setShowEditShift={setShowEditShift}
                timeEntry={timeEntry}
                timeEntriesIndex={timeEntriesIndex}
                timeEntries={timeEntries}
                setTimeEntries={setTimeEntries}
                summaryMessages={summaryMessages}
                setSummaryMessages={setSummaryMessages}
                timePeriodTypesMap={timePeriodTypesMap}
              />
            </dt>
          </div>
        )}
        <div className="govuk-summary-list__row govuk-summary-list__row--no-border">
          <dt className="govuk-summary-list__key">Meal break</dt>
          <dd className="govuk-summary-list__value"></dd>
          <dd className="govuk-summary-list__actions">
            {timeEntryExists && (
              <Link
                className="govuk-link govuk-link--no-visited-state"
                to={'/'}
                data-testid="meal-break-change-button"
              >
                Edit<span className="govuk-visually-hidden"> meal break</span>
              </Link>
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default Shift;

Shift.propTypes = {
  summaryErrors: PropTypes.array,
  setSummaryErrors: PropTypes.func,
  timecardDate: PropTypes.string,
  timeEntry: PropTypes.object,
  timeEntriesIndex: PropTypes.number,
  timeEntries: PropTypes.array,
  setTimeEntries: PropTypes.func,
  summaryMessages: PropTypes.array,
  setSummaryMessages: PropTypes.func,
  timePeriodTypesMap: PropTypes.any,
};
