import { getTimePeriodTypesMap } from '../../../utils/time-entry-utils/timeEntryUtils';
import Shift from '../shift/Shift';
import SimpleTimePeriod from '../simple-time-period/SimpleTimePeriod';
import { PropTypes } from 'prop-types';

const TimecardEntriesList = ({
  summaryErrors,
  setSummaryErrors,
  timecardDate,
  timeEntries,
  setTimeEntries,
  timePeriodTypes,
  hasShiftMovedCallback,
  summaryMessages,
  setSummaryMessages,
}) => {
  const timePeriodTypesMap = getTimePeriodTypesMap(timePeriodTypes);

  return (
    <div>
      {timeEntries.map((timeEntry, index) => (
        <div key={index} className="govuk-!-margin-bottom-6">
          {renderTimeEntry({
            summaryErrors,
            setSummaryErrors,
            timecardDate,
            timePeriodTypesMap,
            timeEntry,
            index,
            hasShiftMovedCallback,
            timeEntries,
            setTimeEntries,
            summaryMessages,
            setSummaryMessages,
          })}
        </div>
      ))}
    </div>
  );
};

const renderTimeEntry = ({
  summaryErrors,
  setSummaryErrors,
  timecardDate,
  timePeriodTypesMap,
  timeEntry,
  index,
  hasShiftMovedCallback,
  timeEntries,
  setTimeEntries,
  summaryMessages,
  setSummaryMessages,
}) => {
  const periodType = timePeriodTypesMap[timeEntry.timePeriodTypeId];

  if (periodType === 'Shift') {
    return (
      <Shift
        summaryErrors={summaryErrors}
        setSummaryErrors={setSummaryErrors}
        timecardDate={timecardDate}
        timeEntry={timeEntry}
        timeEntriesIndex={index}
        hasShiftMovedCallback={hasShiftMovedCallback}
        timeEntries={timeEntries}
        setTimeEntries={setTimeEntries}
        summaryMessages={summaryMessages}
        setSummaryMessages={setSummaryMessages}
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
  summaryMessages: PropTypes.array,
  setSummaryMessages: PropTypes.func,
};
