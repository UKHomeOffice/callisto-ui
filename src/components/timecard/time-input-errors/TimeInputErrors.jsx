import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';
import { useApplicationContext } from '../../../context/ApplicationContext';
import {
  ClashingProperty,
  formatLongDate,
  formatTime,
  getTimePeriodTypesMap,
} from '../../../utils/time-entry-utils/timeEntryUtils';

const TimeInputErrors = ({ clashingProperty, clashes }) => {
  const { timePeriodTypes } = useApplicationContext();
  const timePeriodTypesMap = getTimePeriodTypesMap(timePeriodTypes);

  const displayClashingProperty = () => {
    if (clashingProperty === ClashingProperty.startTime) {
      return <p>Your start time must not overlap with another time period</p>;
    }

    if (clashingProperty === ClashingProperty.endTime) {
      return <p>Your finish time must not overlap with another time period</p>;
    }

    return (
      <p>
        Your start and finish times must not overlap with another time period
      </p>
    );
  };

  const displaySingleTimeClash = () => {
    if (clashes.length === 0) {
      throw new Error(
        'The time clashes data did not contain at least one time clash.'
      );
    }
    const clash = clashes[0];
    let text;

    const timePeriodType = timePeriodTypesMap[clash.timePeriodTypeId];

    if (timePeriodType === 'Shift') {
      text = `You are already assigned to work from ${formatStartDateTime(
        clash
      )} to ${formatTime(clash.endTime)} on ${formatLongDate(clash.endTime)}`;
    } else {
      text = `You are already assigned a ${timePeriodType.toLowerCase()} on ${formatLongDate(
        clash.startTime
      )}`;
    }

    return <p>{text}</p>;
  };

  const displayMultipleTimeClashes = () => {
    sortByStartTime(clashes);

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

  const sortByStartTime = (clashes) => {
    return clashes.sort(
      (a, b) => Date.parse(a.startTime) - Date.parse(b.startTime)
    );
  };

  const timePeriodClashToText = (clash) => {
    const timePeriodType = timePeriodTypesMap[clash.timePeriodTypeId];

    if (timePeriodType === 'Shift') {
      return `${formatStartDateTime(clash)} to ${formatTime(
        clash.endTime
      )} on ${formatLongDate(clash.endTime)}`;
    }

    return `${timePeriodType.toLowerCase()} on ${formatLongDate(
      clash.startTime
    )}`;
  };

  const formatStartDateTime = (clash) => {
    const startTime = new Date(clash.startTime);
    const endTime = new Date(clash.endTime);
    let startDate = '';

    if (!dayjs(startTime).isSame(endTime, 'day')) {
      startDate = ` on ${formatLongDate(clash.startTime)}`;
    }

    return `${formatTime(clash.startTime)}${startDate}`;
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
