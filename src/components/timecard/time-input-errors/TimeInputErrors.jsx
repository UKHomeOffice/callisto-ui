import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';
import { useApplicationContext } from '../../../context/ApplicationContext';
import {
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
    const startTime = new Date(clash.startTime);
    const endTime = new Date(clash.endTime);
    let text;

    const timePeriodType = timePeriodTypesMap[clash.timePeriodTypeId];
    switch (timePeriodType) {
      case 'Shift':
        if (startTime.toDateString() === endTime.toDateString()) {
          text = `You are already assigned to work from ${formatTime(
            clash.startTime
          )} to ${formatTime(clash.endTime)} on ${dayjs(clash.startTime).format(
            'D MMMM YYYY'
          )}`;
        } else {
          text = `You are already assigned to work from ${formatTime(
            clash.startTime
          )} on ${dayjs(clash.startTime).format('D MMMM YYYY')} to ${formatTime(
            clash.endTime
          )} on ${dayjs(clash.endTime).format('D MMMM YYYY')}`;
        }
        break;
      default:
        text = `You are already assigned a ${timePeriodType.toLowerCase()} on ${dayjs(
          clash.startTime
        ).format('D MMMM YYYY')}`;
    }
    return <p>{text}</p>;
  };

  const displayMultipleTimeClashes = () => {
    sortClashes(clashes);

    const times = (
      <div>
        <p>You are already assigned to the following time periods:</p>
        <ul>
          {clashes.map((clash, index) => (
            <li key={index} data-testid="test">
              {timePeriodClashToText(clash)}
            </li>
          ))}
        </ul>
      </div>
    );
    return times;
  };

  const sortClashes = (clashes) => {
    return clashes.sort(
      (a, b) => Date.parse(a.startTime) - Date.parse(b.startTime)
    );
  };

  const timePeriodClashToText = (clash) => {
    const timePeriodType = timePeriodTypesMap[clash.timePeriodTypeId];
    switch (timePeriodType) {
      case 'Shift':
        return `${formatTime(clash.startTime)} to ${formatTime(
          clash.endTime
        )} on ${dayjs(clash.startTime).format('D MMMM YYYY')}`;
      default:
        return `${timePeriodType.toLowerCase()} on ${dayjs(
          clash.startTime
        ).format('D MMMM YYYY')}`;
    }
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
