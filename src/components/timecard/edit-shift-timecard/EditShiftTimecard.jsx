import { useState } from 'react';
import { Link } from 'react-router-dom';
import EditShiftHours from '../edit-shift-hours/EditShiftHours';

const EditShiftTimecard = () => {
  const toggleEditShiftHours = (event) => {
    event.preventDefault();
    setShowEditShiftHours(!showEditShiftHours);
  };

  const [showEditShiftHours, setShowEditShiftHours] = useState(false);

  return (
    <div className="select-timecard-period-type">
      <dl className="govuk-summary-list govuk-summary-list--no-border govuk-!-margin-bottom-0">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Shift</dt>
          <dd className="govuk-summary-list__actions">
            <Link className="govuk-link govuk-link--no-visited-state" to={'/'}>
              Remove<span className="govuk-visually-hidden"> shift</span>
            </Link>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Hours</dt>
          <dd className="govuk-summary-list__actions">
            <Link
              onClick={toggleEditShiftHours}
              className="govuk-link govuk-link--no-visited-state"
              to={'/'}
              data-testid="shift-change-button"
            >
              Change<span className="govuk-visually-hidden"> hours</span>
            </Link>
          </dd>
        </div>
        {showEditShiftHours && (
          <EditShiftHours setShowEditShiftHours={setShowEditShiftHours} />
        )}
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Meal break</dt>
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
