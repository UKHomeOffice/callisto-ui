import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TimecardContext } from '../../../pages/timecard/Timecard';
import EditShiftHours from '../edit-shift-hours/EditShiftHours';

const EditShiftTimecard = () => {
  const toggleEditShiftHours = (event) => {
    event.preventDefault();
    setShowEditShiftHours(!showEditShiftHours);
  };

  const { timecardData } = useContext(TimecardContext);
  const timecardDataExists = timecardData.startTime === '';
  const [showEditShiftHours, setShowEditShiftHours] =
    useState(timecardDataExists);

  return (
    <div className="select-timecard-period-type">
      <dl className="govuk-summary-list govuk-!-margin-bottom-0">
        <div className="govuk-summary-list__row">
          <dt
            className="govuk-summary-list__key"
            style={{ paddingBottom: '20px', paddingTop: '10px' }}
          >
            Shift
          </dt>
          <dd className="govuk-summary-list__actions">
            <Link className="govuk-link govuk-link--no-visited-state" to={'/'}>
              Remove<span className="govuk-visually-hidden"> shift</span>
            </Link>
          </dd>
        </div>
        <div className="govuk-summary-list__row govuk-summary-list__row--no-border">
          <dt
            className="govuk-summary-list__key"
            style={{ paddingBottom: '20px', paddingTop: '20px' }}
          >
            Hours
          </dt>
          <dd className="govuk-summary-list__actions">
            {timecardData && !timecardDataExists && (
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
          <EditShiftHours setShowEditShiftHours={setShowEditShiftHours} />
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
          <dd className="govuk-summary-list__actions">
            <Link className="govuk-link govuk-link--no-visited-state" to={'/'}>
              Change<span className="govuk-visually-hidden"> meal break</span>
            </Link>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default EditShiftTimecard;

EditShiftTimecard.displayName = 'EditShiftTimecard';
