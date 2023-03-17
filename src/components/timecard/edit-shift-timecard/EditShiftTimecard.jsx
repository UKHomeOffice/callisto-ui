import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditShiftHours from '../edit-shift-hours/EditShiftHours';
import { deleteTimeEntry } from '../../../api/services/timecardService';
import { UrlSearchParamBuilder } from '../../../utils/api-utils/UrlSearchParamBuilder';
import { useTimecardContext } from '../../../context/TimecardContext';
import {
  formatDateNoYear,
  formatTime,
  removeTimecardContextEntry,
} from '../../../utils/time-entry-utils/timeEntryUtils';
import { validateServiceErrors } from '../../../utils/api-utils/ApiUtils';
import { useApplicationContext } from '../../../context/ApplicationContext';

const EditShiftTimecard = ({
  timeEntry,
  timeEntriesIndex,
  hasShiftMovedCallback,
}) => {
  const { setServiceError } = useApplicationContext();
  const { timeEntries, setTimeEntries, setSummaryErrors } =
    useTimecardContext();

  const timeEntryExists = !!timeEntry?.startTime && timeEntry.startTime !== '';
  const [showEditShiftHours, setShowEditShiftHours] = useState(
    !timeEntryExists
  );

  const toggleEditShiftHours = (event) => {
    event.preventDefault();
    setShowEditShiftHours(!showEditShiftHours);
  };

  useEffect(() => {
    if (timeEntryExists === false) {
      setShowEditShiftHours(true);
    }
  });

  const handleClickRemoveShiftButton = async (event) => {
    event.preventDefault();
    const params = new UrlSearchParamBuilder()
      .setTenantId('00000000-0000-0000-0000-000000000000')
      .getUrlSearchParams();

    setSummaryErrors({});
    validateServiceErrors(
      setServiceError,
      async () => {
        await deleteTimeEntry(timeEntry.timeEntryId, params);
        removeTimecardContextEntry(
          timeEntries,
          setTimeEntries,
          timeEntriesIndex
        );
      },
      true
    );
  };

  return (
    <div className="grey-border">
      <dl className="govuk-summary-list govuk-!-margin-bottom-0">
        <div className="govuk-summary-list__row">
          <dt
            className="govuk-summary-list__key govuk-!-width-two-thirds"
            style={{ paddingBottom: '20px', paddingTop: '10px' }}
          >
            Shift
          </dt>
          <dd className="govuk-summary-list__value"></dd>
          <dd className="govuk-summary-list__actions" style={{ width: '43%' }}>
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
        <div className="govuk-summary-list__row govuk-summary-list__row--no-border">
          <dt
            className="govuk-summary-list__key"
            style={{
              paddingBottom: '20px',
              paddingTop: '20px',
            }}
          >
            Hours
          </dt>
          <dd
            className="govuk-summary-list__value govuk-!-width-full"
            style={{ whiteSpace: 'nowrap' }}
          >
            {!showEditShiftHours &&
              timeEntryExists &&
              `${formatTime(timeEntry.startTime)} to ${
                timeEntry.finishTime ? formatTime(timeEntry.finishTime) : '-'
              } ${
                timeEntry.finishNextDay
                  ? ` on ${formatDateNoYear(timeEntry.finishTime)}`
                  : ''
              }`}
          </dd>
          <dd className="govuk-summary-list__actions">
            {timeEntryExists && (
              <Link
                onClick={toggleEditShiftHours}
                className="govuk-link govuk-link--no-visited-state"
                to={'/'}
                data-testid="hours-change-button"
              >
                Change<span className="govuk-visually-hidden"> hours</span>
              </Link>
            )}
          </dd>
        </div>
        {showEditShiftHours && (
          <div className="govuk-summary-list__row govuk-summary-list__row--no-border">
            <dt className="govuk-summary-list__key">
              <EditShiftHours
                setShowEditShiftHours={setShowEditShiftHours}
                timeEntry={timeEntry}
                timeEntriesIndex={timeEntriesIndex}
                hasShiftMovedCallback={hasShiftMovedCallback}
              />
            </dt>
          </div>
        )}
        <div
          className="govuk-summary-list__row govuk-summary-list__row--no-border"
          style={{ borderTop: '1px solid #b1b4b6' }}
        >
          <dt
            className="govuk-summary-list__key"
            style={{
              paddingBottom: '10px',
              paddingTop: '20px',
            }}
          >
            Meal break
          </dt>
          <dd className="govuk-summary-list__value"></dd>
          <dd className="govuk-summary-list__actions">
            {timeEntryExists && (
              <Link
                className="govuk-link govuk-link--no-visited-state"
                to={'/'}
                data-testid="meal-break-change-button"
              >
                Change<span className="govuk-visually-hidden"> meal break</span>
              </Link>
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default EditShiftTimecard;

EditShiftTimecard.propTypes = {
  timeEntry: PropTypes.object,
  timeEntriesIndex: PropTypes.number,
  hasShiftMovedCallback: PropTypes.func,
};
