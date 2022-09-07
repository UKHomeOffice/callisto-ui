import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTimecardContext } from '../../../context/TimecardContext';
import EditShiftHours from '../edit-shift-hours/EditShiftHours';

const EditShiftTimecard = () => {
  const toggleEditShiftHours = (event) => {
    event.preventDefault();
    setShowEditShiftHours(!showEditShiftHours);
  };

  const { timeEntries } = useTimecardContext();
  const timeEntriesExists = timeEntries.length > 0;
  const [showEditShiftHours, setShowEditShiftHours] = useState(
    !timeEntriesExists
  );

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
            {timeEntriesExists && (
              <Link
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
              timeEntriesExists &&
              `${timeEntries.startTime} to ${
                timeEntries.finishTime ? timeEntries.finishTime : '-'
              }`}
          </dd>
          <dd className="govuk-summary-list__actions">
            {timeEntriesExists && (
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
              <EditShiftHours setShowEditShiftHours={setShowEditShiftHours} />
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
            {timeEntriesExists && (
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
