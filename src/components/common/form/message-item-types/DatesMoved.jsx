import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDateNoYear } from '../../../../utils/time-entry-utils/timeEntryUtils';
import { useTimecardContext } from '../../../../context/TimecardContext';

const DatesMoved = ({ variables }) => {
  const clearSummary = () => {
    //setSummaryMessages([]);
  };

  const startDate = variables.startDate;
  const endDate = variables.endDate;
  const formattedStart = formatDateNoYear(startDate);
  const formattedEnd = formatDateNoYear(endDate);
  return (
    <div className="dates-moved-container">
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
      {endDate && (
        <>
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
        </>
      )}
    </div>
  );
};

export default DatesMoved;

DatesMoved.propTypes = {
  variables: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
  }),
};
