import { Link } from 'react-router-dom';
import { addTimePeriodHeading } from '../../../utils/time-entry-utils/timeEntryUtils';
import { PropTypes } from 'prop-types';

const AddTimeCardPeriod = ({ setSummaryErrors, setAddNewTimeEntry }) => {
  const handleAddTimePeriod = (event) => {
    event.preventDefault();
    setSummaryErrors([]);
    setAddNewTimeEntry(true);
  };

  return (
    <div className="govuk-!-margin-bottom-6">
      <div className="grey-border">
        <div className="govuk-summary-list govuk-!-margin-bottom-0">
          <div className="govuk-summary-list__row govuk-summary-list__row--no-border">
            <p className="govuk-heading-s govuk-!-width-two-thirds govuk-!-margin-bottom-0">
              {addTimePeriodHeading}
            </p>
            <div className="govuk-summary-list__actions govuk-!-margin-bottom-0">
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
AddTimeCardPeriod.propTypes = {
  setSummaryErrors: PropTypes.func,
};
