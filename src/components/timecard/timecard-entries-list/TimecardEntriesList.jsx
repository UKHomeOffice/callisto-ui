import AddTimeCardPeriod from '../add-timecard-period/AddTimeCardPeriod';
import { getTimePeriodTypesMap } from '../../../utils/time-entry-utils/timeEntryUtils';
import EditShiftTimecard from '../edit-shift-timecard/EditShiftTimecard';
import SimpleTimePeriod from '../simple-time-period/SimpleTimePeriod';
import { PropTypes } from 'prop-types';

const TimecardEntriesList = ({
  timeEntries,
  timePeriodTypes,
  hasShiftMovedCallback,
}) => {
  const timePeriodTypesMap = getTimePeriodTypesMap(timePeriodTypes);

  return (
    <div>
      {timeEntries.map((timeEntry, index) => (
        <div key={index} className="govuk-!-margin-bottom-6">
          {renderTimeEntry({
            timePeriodTypesMap,
            timeEntry,
            index,
            hasShiftMovedCallback,
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
  hasShiftMovedCallback,
}) => {
  switch (timePeriodTypesMap[timeEntry.timePeriodTypeId]) {
    case 'Shift':
      return (
        <EditShiftTimecard
          timeEntry={timeEntry}
          timeEntriesIndex={index}
          hasShiftMovedCallback={hasShiftMovedCallback}
        />
      );
    case 'Scheduled rest day':
    case 'Non-working day':
    case 'On call':
    case 'Absence':
    case 'Training':
    case 'Overtime':
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
  hasShiftMovedCallback: PropTypes.func,
};
