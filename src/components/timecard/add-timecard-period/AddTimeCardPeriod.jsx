import { useTimecardContext } from '../../../context/TimecardContext';
import { Link } from 'react-router-dom';
import { addTimePeriodHeading } from '../../../utils/time-entry-utils/timeEntryUtils';

const AddTimeCardPeriod = (setSummaryErrors) => {
  const { setNewTimeEntry } = useTimecardContext();

  const handleAddTimePeriod = (event) => {
    event.preventDefault();
    setSummaryErrors([]);
    setNewTimeEntry(true);
  };

  return (
    <div className="govuk-!-margin-bottom-6">
      <div className="grey-border">
        <div className="govuk-summary-list govuk-!-margin-bottom-0">
          <div className="govuk-summary-list__row govuk-summary-list__row--no-border">
            <p className="govuk-heading-s govuk-!-width-two-thirds">
              {addTimePeriodHeading}
            </p>
            <div className="govuk-summary-list__actions">
              <Link
                onClick={handleAddTimePeriod}
                className="govuk-link govuk-link--no-visited-state"
                to={'/'}
              >
                Add
                <span className="govuk-visually-hidden"> timecard period</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTimeCardPeriod;
