import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDateNoYear } from '../../../../utils/time-entry-utils/timeEntryUtils';

const SingleDateMoved = ({
  variables,
  setSummaryMessages,
  setIsAlertVisible,
}) => {
  const clearSummary = () => {
    setSummaryMessages({});
    setIsAlertVisible(false);
  };

  const startDate = variables[0];
  const formattedStart = formatDateNoYear(startDate);
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
    </div>
  );
};

export default SingleDateMoved;

SingleDateMoved.propTypes = {
  variables: PropTypes.array,
  setSummaryMessages: PropTypes.func,
  setIsAlertVisible: PropTypes.func,
};
