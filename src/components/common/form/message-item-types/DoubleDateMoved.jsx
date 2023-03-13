import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDateNoYear } from '../../../../utils/time-entry-utils/timeEntryUtils';

const DoubleDateMoved = ({
  variables,
  setSummaryMessages,
  setIsAlertVisible,
}) => {
  const clearSummary = () => {
    setSummaryMessages({});
    setIsAlertVisible(false);
  };

  const startDate = variables[0];
  const endDate = variables[1];
  const formattedStart = formatDateNoYear(startDate);
  const formattedEnd = formatDateNoYear(endDate);
  return (
    <div>
      The time period starts on&nbsp;
      <Link
        onClick={() => {
          clearSummary();
        }}
        className="govuk-link govuk-link--no-visited-state"
        to={`/timecard/${startDate}`}
      >
        {formattedStart}
      </Link>
      &nbsp;and finishes on&nbsp;
      <Link
        onClick={() => {
          clearSummary();
        }}
        className="govuk-link govuk-link--no-visited-state"
        to={`/timecard/${endDate}`}
      >
        {formattedEnd}
      </Link>
    </div>
  );
};

export default DoubleDateMoved;

DoubleDateMoved.propTypes = {
  variables: PropTypes.array,
  setSummaryMessages: PropTypes.func,
  setIsAlertVisible: PropTypes.func,
};
