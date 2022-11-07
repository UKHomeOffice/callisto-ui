import { PropTypes } from 'prop-types';

const TimeInputErrors = ({ clashingProperty }) => {
  switch (clashingProperty) {
    case 'startTime':
      return <p>Your start time must not overlap with another time period</p>;
    case 'endTime':
      return <p>Your finish time must not overlap with another time period</p>;
    default:
      return (
        <p>
          Your start and finish times must not overlap with another time period
        </p>
      );
  }
};

export default TimeInputErrors;
TimeInputErrors.propTypes = {
  clashingProperty: PropTypes.string.isRequired,
};
