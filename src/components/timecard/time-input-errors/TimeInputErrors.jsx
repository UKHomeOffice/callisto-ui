import { PropTypes } from 'prop-types';
import {
  formatDate,
  formatTime,
} from '../../../utils/time-entry-utils/timeEntryUtils';

const TimeInputErrors = ({ clashingProperty, clashes }) => {
  const displayClashingProperty = () => {
    switch (clashingProperty) {
      case 'startTime':
        return <p>Your start time must not overlap with another time period</p>;
      case 'endTime':
        return (
          <p>Your finish time must not overlap with another time period</p>
        );
      default:
        return (
          <p>
            Your start and finish times must not overlap with another time
            period
          </p>
        );
    }
  };

  const displayTimeClashes = () => {
    const clash = clashes[0];
    const startTime = Date.parse(clash.startTime);
    const endTime = Date.parse(clash.endTime);
    let text;
    if (clash.timePeriodTypeId == '00000000-0000-0000-0000-000000000001') {
      text = `You are already assigned to work from ${formatTime(
        startTime
      )} to ${formatTime(endTime)} on ${formatDate(startTime)}`;
    } else {
      text = `You are already assigned a scheduled rest day on ${formatDate(
        startTime
      )}`;
    }
    return <p>{text}</p>;
  };

  return (
    <>
      {displayClashingProperty()} {displayTimeClashes()}
    </>
  );
};

export default TimeInputErrors;
TimeInputErrors.propTypes = {
  clashingProperty: PropTypes.string.isRequired,
  clashes: PropTypes.arrayOf(
    PropTypes.shape({
      timePeriodTypeId: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
    })
  ).isRequired,
};
