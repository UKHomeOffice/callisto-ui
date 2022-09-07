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

import { sortErrorKeys } from '../../utils/sort-errors/sortErrors';

const updateTimeEntryContextData = async (
  timeEntries,
  date,
  setTimeEntries
) => {
  const params = new UrlSearchParamBuilder()
    .setTenantId('00000000-0000-0000-0000-000000000000')
    .setFilter('ownerId==1')
    .getUrlSearchParams();
  const timeEntriesResponse = await getTimeEntries(params);

  if (
    timeEntriesResponse?.data?.items &&
    timeEntriesResponse.data.items.length > 0
  ) {
    const timeEntriesArray = [];
    const timeEntries = timeEntriesResponse.data.items;

    timeEntries.map((timeEntry) => {
      timeEntriesArray.push({
        timeEntryId: timeEntry.id,
        timePeriodType: timeEntry.shiftType,
        startDate: formatDate(timeEntry.actualStartTime),
        startTime: formatTime(timeEntry.actualStartTime),
        finishTime: timeEntry.actualEndTime
          ? formatTime(timeEntry.actualEndTime)
          : '',
        finishDate: timeEntry.actualEndTime
          ? formatDate(timeEntry.actualEndTime)
          : '',
        timePeriodTypeId: timeEntry.timePeriodTypeId,
      });
    });

    setTimeEntries(timeEntriesArray);
  } else {
    setTimeEntries([]);
  }
};

const Timecard = () => {
  const { date } = useParams();

  const previousDay = dayjs(date).subtract(1, 'day').format('YYYY-MM-DD');
  const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD');

  const {
    summaryErrors,
    timeEntries,
    setTimeEntries,
    // timecardDate,
    setTimecardDate,
  } = useTimecardContext();

  const desiredErrorOrder = [
    'shift-start-time',
    'shift-finish-time',
    'timePeriod',
  ];

  useEffect(() => {
    document.title = generateDocumentTitle('Timecard ');
    setTimecardDate(date);
    updateTimeEntryContextData(timeEntries, date, setTimeEntries);
  }, [date]);

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

      {timeEntries.length > 0 &&
        timeEntries.map((timeEntry, index) => (
          <div key={index} className="govuk-!-margin-bottom-3">
            <EditShiftTimecard timeEntry={timeEntry} index={index} />
          </div>
        ))}
      {timeEntries.length === 0 && <SelectTimecardPeriodType />}
    </>
  );
};

export default Timecard;
