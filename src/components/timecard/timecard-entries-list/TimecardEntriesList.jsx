import AddTimeCardPeriod from '../add-timecard-period/AddTimeCardPeriod';
import { getTimePeriodTypesMap } from '../../../utils/time-entry-utils/timeEntryUtils';
import EditShiftTimecard from '../edit-shift-timecard/EditShiftTimecard';
import SimpleTimePeriod from '../simple-time-period/SimpleTimePeriod';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';

const TimecardEntriesList = ({
  timeEntries,
  timePeriodTypes,
  hasShiftMoved,
}) => {
  const timePeriodTypesMap = getTimePeriodTypesMap(timePeriodTypes);

  useEffect(() => {
    console.log('Time Entries: ', timeEntries);
  }, [timeEntries]);
  return (
    <div>
      {timeEntries.map((timeEntry, index) => (
        <div key={index} className="govuk-!-margin-bottom-6">
          {renderTimeEntry({
            timePeriodTypesMap,
            timeEntry,
            index,
            hasShiftMoved,
          })}
        </div>
      ))}
      <AddTimeCardPeriod />
    </div>
  );
};

const renderTimeEntry = ({
  timePeriodTypesMap,
  timeEntry,
  index,
  hasShiftMoved,
}) => {
  switch (timePeriodTypesMap[timeEntry.timePeriodTypeId]) {
    case 'Shift':
      return (
        <EditShiftTimecard
          timeEntry={timeEntry}
          timeEntriesIndex={index}
          hasShiftMoved={hasShiftMoved}
        />
      );
    default:
      return (
        <SimpleTimePeriod
          timeEntry={timeEntry}
          timeEntriesIndex={index}
          timePeriodTitle={timePeriodTypesMap[timeEntry.timePeriodTypeId]}
        />
      );
  }
};

export default TimecardEntriesList;

TimecardEntriesList.propTypes = {
  timeEntries: PropTypes.array,
  timePeriodTypes: PropTypes.array,
  hasShiftMoved: PropTypes.func,
};
