import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import BackLink from '../../components/common/form/navigation/backlink/BackLink';
import SelectTimecardPeriodType from '../../components/timecard/select-timecard-period-type/SelectTimecardPeriodType';
import ErrorSummary from '../../components/common/form/error-summary/ErrorSummary';
import generateDocumentTitle from '../../utils/generate-document-title/generateDocumentTitle';
import { getTimeEntries } from '../../api/services/timecardService';
import {
  formatTime,
  formatDate,
} from '../../utils/time-entry-utils/timeEntryUtils';
import { UrlSearchParamBuilder } from '../../utils/api-utils/UrlSearchParamBuilder';
import EditShiftTimecard from '../../components/timecard/edit-shift-timecard/EditShiftTimecard';
import { useTimecardContext } from '../../context/TimecardContext';
import { useApplicationContext } from '../../context/ApplicationContext';

import { sortErrorKeys } from '../../utils/sort-errors/sortErrors';
import { filterTimeEntriesOnDate } from '../../utils/filters/time-entry-filter/timeEntryFilterBuilder';
import { ContextTimeEntry } from '../../utils/time-entry-utils/ContextTimeEntry';
import AddTimeCardPeriod from '../../components/timecard/add-timecard-period/AddTimeCardPeriod';

const updateTimeEntryContextData = async (
  date,
  setTimeEntries,
  timePeriodTypes
) => {
  const timeEntriesParams = new UrlSearchParamBuilder()
    .setTenantId('00000000-0000-0000-0000-000000000000')
    .setFilters('ownerId==1', ...filterTimeEntriesOnDate(date))
    .getUrlSearchParams();
  const timeEntriesResponse = await getTimeEntries(timeEntriesParams);

  if (timeEntriesResponse.data.items?.length > 0) {
    const existingTimeEntries = timeEntriesResponse.data.items.map(
      (timeEntry) =>
        new ContextTimeEntry(
          timeEntry.id,
          timePeriodTypes[timeEntry.timePeriodTypeId],
          formatTime(timeEntry.actualStartTime),
          timeEntry.actualEndTime ? formatTime(timeEntry.actualEndTime) : '',
          timeEntry.timePeriodTypeId
        )
    );
    setTimeEntries(existingTimeEntries);
  } else {
    setTimeEntries([]);
  }
};

const getTimePeriodTypesMap = (timePeriodTypes) => {
  let timePeriodTypesMap = {};
  timePeriodTypes.map(
    (timePeriodType) => (timePeriodTypesMap[timePeriodType.id] = timePeriodType)
  );
  return timePeriodTypesMap;
};

const Timecard = () => {
  const {
    summaryErrors,
    timeEntries,
    setTimeEntries,
    setTimecardDate,
    newTimeEntry,
  } = useTimecardContext();
  const { timePeriodTypes } = useApplicationContext();

  const { date } = useParams();
  const previousDay = formatDate(dayjs(date).subtract(1, 'day'));
  const nextDay = formatDate(dayjs(date).add(1, 'day'));

  const desiredErrorOrder = [
    'shift-start-time',
    'shift-finish-time',
    'timePeriod',
  ];

  useEffect(() => {
    document.title = generateDocumentTitle('Timecard ');
    setTimecardDate(date);
    updateTimeEntryContextData(
      date,
      setTimeEntries,
      getTimePeriodTypesMap(timePeriodTypes)
    );
  }, [date, timePeriodTypes]);

  return (
    <>
      <BackLink text="Back to calendar" link="/calendar" />
      {summaryErrors && Object.keys(summaryErrors).length !== 0 && (
        <ErrorSummary
          errors={summaryErrors}
          keys={sortErrorKeys(summaryErrors, desiredErrorOrder)}
        />
      )}
      <h1 className="govuk-caption-m">My Timecard</h1>
      <h2 className="govuk-heading-m">{dayjs(date).format('DD MMMM YYYY')}</h2>
      <div className="govuk-button-group">
        <Link
          className="govuk-link govuk-link--no-visited-state"
          to={`/timecard/${previousDay}`}
        >
          Previous day
        </Link>
        <Link
          className="govuk-link govuk-link--no-visited-state"
          to={`/timecard/${nextDay}`}
        >
          Next day
        </Link>
        <Link
          className="govuk-link govuk-link--no-visited-state"
          to="/calendar"
        >
          Select another date
        </Link>
      </div>

      {newTimeEntry && <SelectTimecardPeriodType />}
      {!newTimeEntry && (
        <>
          {timeEntries.map((timeEntry, index) => (
            <div key={index} className="govuk-!-margin-bottom-6">
              <EditShiftTimecard
                timeEntry={timeEntry}
                timeEntriesIndex={index}
              />
            </div>
          ))}
          {timeEntries.length === 0 && (
            <AddTimeCardPeriod timecardEmpty={true} />
          )}
          {timeEntries.length > 0 && (
            <AddTimeCardPeriod timecardEmpty={false} />
          )}
        </>
      )}
    </>
  );
};

export default Timecard;
