import { PropTypes, Link } from 'prop-types';

// const clearSummary = () => {
//   // setSummaryMessages({});
//   // setIsAlertVisible(false);
// };

const SingleDateMoved = () => {
  return (
    <div>
      <Link
        onClick={() => {
          // clearSummary();
        }}
        className="govuk-link govuk-link--no-visited-state"
        to={`/timecard/2023-03-05`}
      >
        05 March
      </Link>
    </div>
  );
};

export default SingleDateMoved;

SingleDateMoved.propTypes = {
 // templateName: PropTypes.string,
};
