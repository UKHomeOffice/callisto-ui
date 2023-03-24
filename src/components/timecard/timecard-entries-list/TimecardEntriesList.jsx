import AddTimeCardPeriod from '../add-timecard-period/AddTimeCardPeriod';
import { getTimePeriodTypesMap } from '../../../utils/time-entry-utils/timeEntryUtils';
import Shift from '../shift/Shift';
import SimpleTimePeriod from '../simple-time-period/SimpleTimePeriod';
import { PropTypes } from 'prop-types';

const TimecardEntriesList = ({
  timecardDate,
  timeEntries,
  setTimeEntries,
  timePeriodTypes,
  hasShiftMovedCallback,
}) => {
  const timePeriodTypesMap = getTimePeriodTypesMap(timePeriodTypes);

  return (
    <div>
      {timeEntries.map((timeEntry, index) => (
        <div key={index} className="govuk-!-margin-bottom-6">
          {renderTimeEntry({
            timecardDate,
            timePeriodTypesMap,
            timeEntry,
            index,
            hasShiftMovedCallback,
            timeEntries,
            setTimeEntries,
          })}
        </div>
      ))}
      <AddTimeCardPeriod />
    </div>
  );
};

const renderTimeEntry = ({
  timecardDate,
  timePeriodTypesMap,
  timeEntry,
  index,
  hasShiftMovedCallback,
  timeEntries,
  setTimeEntries,
}) => {
  const periodType = timePeriodTypesMap[timeEntry.timePeriodTypeId];

  if (periodType === 'Shift') {
    return (
      <Shift
        timecardDate={timecardDate}
        timeEntry={timeEntry}
        timeEntriesIndex={index}
        hasShiftMovedCallback={hasShiftMovedCallback}
        timeEntries={timeEntries}
        setTimeEntries={setTimeEntries}
      />
    );
  } else {
    return (
      <SimpleTimePeriod
        timecardDate={timecardDate}
        timeEntry={timeEntry}
        timeEntriesIndex={index}
        timePeriodTitle={timePeriodTypesMap[timeEntry.timePeriodTypeId]}
        timeEntries={timeEntries}
        setTimeEntries={setTimeEntries}
      />
    );
  }
};

export default TimecardEntriesList;

TimecardEntriesList.propTypes = {
  timecardDate: PropTypes.string,
  timeEntries: PropTypes.array,
  setTimeEntries: PropTypes.func,
  timePeriodTypes: PropTypes.array,
  hasShiftMovedCallback: PropTypes.func,
};
