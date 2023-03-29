import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';
import { clashingProperties } from '../../../utils/constants';
import {
  formatLongDate,
  formatTime,
} from '../../../utils/time-entry-utils/timeEntryUtils';

const TimeInputErrors = ({ clashingProperty, clashes, timePeriodTypesMap }) => {
  const displayClashingProperty = () => {
    if (clashingProperty === clashingProperties.startTime) {
      return <p>Your start time must not overlap with another time period</p>;
    }

    if (clashingProperty === clashingProperties.endTime) {
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
      text = `You are already assigned to work from 
      ${formatStartDateTime(clash)} ${getEndTimeText(clash.endTime)}`;
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
      return `${formatStartDateTime(clash)} ${getEndTimeText(clash.endTime)}`;
    }

    return `${timePeriodType.toLowerCase()} on ${formatLongDate(
      clash.startTime
    )}`;
  };

  const getEndTimeText = (endTime) => {
    return endTime
      ? `to ${formatTime(endTime)} on ${formatLongDate(endTime)}`
      : '';
  };

  const formatStartDateTime = (clash) => {
    let startDate = '';

    if (!dayjs(clash.startTime).isSame(clash.endTime, 'day')) {
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
  timePeriodTypesMap: PropTypes.any,
};
