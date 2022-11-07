import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';
import { useApplicationContext } from '../../../context/ApplicationContext';
import {
  formatDate,
  formatTime,
  getTimePeriodTypesMap,
} from '../../../utils/time-entry-utils/timeEntryUtils';

const TimeInputErrors = ({ clashingProperty, clashes }) => {
  const { timePeriodTypes } = useApplicationContext();
  const timePeriodTypesMap = getTimePeriodTypesMap(timePeriodTypes);

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

  const displaySingleTimeClash = () => {
    const clash = clashes[0];
    const startTime = Date.parse(clash.startTime);
    const endTime = Date.parse(clash.endTime);
    let text;
    const timePeriodType = timePeriodTypesMap[clash.timePeriodTypeId];
    switch (timePeriodType) {
      case 'Shift':
        text = `You are already assigned to work from ${formatTime(
          startTime
        )} to ${formatTime(endTime)} on ${dayjs(startTime).format(
          'D MMMM YYYY'
        )}`;
        break;
      default:
        text = `You are already assigned a ${timePeriodType.toLowerCase()} on ${dayjs(
          startTime
        ).format('D MMMM YYYY')}`;
    }
    return <p>{text}</p>;
  };

  const displayMultipleTimeClashes = () => {
    var times = (
      <div>
        <p>You are already assigned to the following time periods:</p>
        <ul>
          {clashes.map((clash, index) => (
            <li key={index}>{shiftClashToText(clash)}</li>
          ))}
        </ul>
      </div>
    );
    return times;
  };

  const shiftClashToText = (clash) => {
    var startTime = Date.parse(clash.startTime);
    var endTime = Date.parse(clash.endTime);
    var clashText = `${formatTime(startTime)} to ${formatTime(
      endTime
    )} on ${dayjs(startTime).format('D MMMM YYYY')}`;
    return clashText;
  };

  return (
    <>
      {displayClashingProperty()}
      {clashes.length > 1
        ? displayMultipleTimeClashes()
        : displaySingleTimeClash()}
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
