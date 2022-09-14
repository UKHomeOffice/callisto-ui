import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import EditShiftHours from '../edit-shift-hours/EditShiftHours';
import { deleteTimeEntry } from '../../../api/services/timecardService';
import { UrlSearchParamBuilder } from '../../../utils/api-utils/UrlSearchParamBuilder';
import { useTimecardContext } from '../../../context/TimecardContext';
import { deepClone } from '../../../utils/common-utils/common-utils';

const EditShiftTimecard = ({ timeEntry, timeEntriesIndex }) => {
  const toggleEditShiftHours = (event) => {
    event.preventDefault();
    setShowEditShiftHours(!showEditShiftHours);
  };

  const { timeEntries, setTimeEntries } = useTimecardContext();

  const timeEntryExists =
    'startTime' in timeEntry && timeEntry.startTime !== '';
  const [showEditShiftHours, setShowEditShiftHours] = useState(
    !timeEntryExists
  );

  const handleClickRemoveShiftButton = async (event) => {
    event.preventDefault();
    const params = new UrlSearchParamBuilder()
      .setTenantId('00000000-0000-0000-0000-000000000000')
      .getUrlSearchParams();
    const response = await deleteTimeEntry(timeEntry.timeEntryId, params);

    if (response.status === 200) {
      const newTimeEntries = deepClone(timeEntries);
      newTimeEntries.splice(timeEntriesIndex, 1);
      setTimeEntries(newTimeEntries);
    }
  };

  return (
    <div className="select-timecard-period-type">
      <dl className="govuk-summary-list govuk-!-margin-bottom-0">
        <div className="govuk-summary-list__row">
          <dt
            className="govuk-summary-list__key govuk-!-width-two-thirds"
            style={{ paddingBottom: '20px', paddingTop: '10px' }}
          >
            Shift
          </dt>
          <dd className="govuk-summary-list__value"></dd>
          <dd className="govuk-summary-list__actions" style={{ width: '10%' }}>
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
            style={{ paddingBottom: '20px', paddingTop: '20px' }}
          >
            Hours
          </dt>
          <dd className="govuk-summary-list__value">
            {!showEditShiftHours &&
              timeEntryExists &&
              `${timeEntry.startTime} to ${
                timeEntry.finishTime ? timeEntry.finishTime : '-'
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
};
