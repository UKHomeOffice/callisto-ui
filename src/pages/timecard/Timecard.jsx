import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import BackLink from '../../components/common/form/navigation/backlink/BackLink';
import SelectTimecardPeriodType from '../../components/timecard/select-timecard-period-type/SelectTimecardPeriodType';
import ErrorSummary from '../../components/common/form/error-summary/ErrorSummary';
import generateDocumentTitle from '../../utils/generate-document-title/generateDocumentTitle';
import {
  getTimeEntries,
  getTimePeriodTypes,
} from '../../api/services/timecardService';
import {
  formatTime,
  formatDate,
} from '../../utils/time-entry-utils/timeEntryUtils';
import { UrlSearchParamBuilder } from '../../utils/api-utils/UrlSearchParamBuilder';
import EditShiftTimecard from '../../components/timecard/edit-shift-timecard/EditShiftTimecard';
import { useTimecardContext } from '../../context/TimecardContext';

import { sortErrorKeys } from '../../utils/sort-errors/sortErrors';

const updateTimeEntryContextData = async (setTimeEntries) => {
  const timeEntriesParams = new UrlSearchParamBuilder()
    .setTenantId('00000000-0000-0000-0000-000000000000')
    .setFilter('ownerId==1')
    .getUrlSearchParams();
  const timeEntriesResponse = await getTimeEntries(timeEntriesParams);

  if (timeEntriesResponse.data.items?.length > 0) {
    const existingTimeEntries = [];

    timeEntriesResponse.data.items.map(async (timeEntry) => {
      const timePeriodTypeParams = new UrlSearchParamBuilder()
        .setTenantId('00000000-0000-0000-0000-000000000000')
        .setId(timeEntry.timePeriodTypeId)
        .getUrlSearchParams();
      const timePeriodType = await getTimePeriodTypes(timePeriodTypeParams);

      existingTimeEntries.push({
        timeEntryId: timeEntry.id,
        timePeriodType: timePeriodType,
        startTime: formatTime(timeEntry.actualStartTime),
        finishTime: timeEntry.actualEndTime
          ? formatTime(timeEntry.actualEndTime)
          : '',
        timePeriodTypeId: timeEntry.timePeriodTypeId,
      });
    });

    setTimeEntries(existingTimeEntries);
  } else {
    setTimeEntries([]);
  }
};

const Timecard = () => {
  const { summaryErrors, timeEntries, setTimeEntries, setTimecardDate } =
    useTimecardContext();

  const { date } = useParams();
  const previousDay = dayjs(date).subtract(1, 'day').format('YYYY-MM-DD');
  const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD');

  const desiredErrorOrder = [
    'shift-start-time',
    'shift-finish-time',
    'timePeriod',
  ];

  useEffect(() => {
    document.title = generateDocumentTitle('Timecard ');
    setTimecardDate(date ? date : formatDate(dayjs()));
    updateTimeEntryContextData(setTimeEntries);
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
          <div key={index} className="govuk-!-margin-bottom-6">
            <EditShiftTimecard timeEntry={timeEntry} index={index} />
          </div>
        ))}
      {timeEntries.length === 0 && <SelectTimecardPeriodType />}
    </>
  );
};

export default Timecard;
