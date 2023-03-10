import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const clearSummary = () => {
  // setSummaryMessages({});
  // setIsAlertVisible(false);
};

const SingleDateMoved = (variables) => {
  const startDate = variables[0];
  return (
    <div>
      <Link
        onClick={() => {
          clearSummary();
        }}
        className="govuk-link govuk-link--no-visited-state"
        to={`/timecard/${startDate}`}
      >
        {startDate}
      </Link>
    </div>
  );
};

export default SingleDateMoved;

SingleDateMoved.propTypes = {
  variables: PropTypes.array,
};
