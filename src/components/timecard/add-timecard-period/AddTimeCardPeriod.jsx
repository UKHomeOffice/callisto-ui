import { useTimecardContext } from '../../../context/TimecardContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AddTimeCardPeriod = ({ timecardEmpty }) => {
  const addPeriodTitle = timecardEmpty
    ? 'Add time period'
    : 'Add another time period';
  const addPeriodDescription = timecardEmpty
    ? 'Use this to record a shift'
    : 'Use this to record overtime or another shift';

  const { setNewTimeEntry } = useTimecardContext();

  const handleAddTimePeriod = (event) => {
    event.preventDefault();
    setNewTimeEntry(true);
  };

  return (
    <div className="govuk-!-margin-bottom-6">
      <div className="add-timecard-period-type">
        <dl className="govuk-summary-list govuk-!-margin-bottom-0">
          <div className="govuk-summary-list__row govuk-summary-list__row--no-border">
            <p className="govuk-heading-s govuk-!-width-two-thirds">
              {addPeriodTitle}
            </p>
            <div
              className="govuk-summary-list__actions"
            >
              <Link
                onClick={handleAddTimePeriod}
                className="govuk-link govuk-link--no-visited-state"
                to={'/'}
              >
                Add
              </Link>
            </div>
          </div>
          <p className="govuk-body-m" style={{ color:'darkslategray' }}>{addPeriodDescription}</p>
        </dl>
      </div>
    </div>
  );
};

export default AddTimeCardPeriod;

AddTimeCardPeriod.propTypes = {
  timecardEmpty: PropTypes.bool.isRequired,
};
