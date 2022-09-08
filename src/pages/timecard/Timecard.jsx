import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import BackLink from '../../components/common/form/navigation/backlink/BackLink';
import SelectTimecardPeriodType from '../../components/timecard/select-timecard-period-type/SelectTimecardPeriodType';
import ErrorSummary from '../../components/common/form/error-summary/ErrorSummary';
import generateDocumentTitle from '../../utils/generate-document-title/generateDocumentTitle';
import EditShiftTimecard from '../../components/timecard/edit-shift-timecard/EditShiftTimecard';
import { useTimecardContext } from '../../context/TimecardContext';
import { getTimeEntries } from '../../api/services/timecardService';
import {
  formatTime,
  formatDate,
} from '../../utils/time-entry-utils/timeEntryUtils';
import { UrlSearchParamBuilder } from '../../utils/api-utils/UrlSearchParamBuilder';
import { sortErrorKeys } from '../../utils/sort-errors/sortErrors';
import { filterTimeEntriesOnDate } from '../../utils/filters/time-entry-filter/timeEntryFilterBuilder';

const updateTimeEntryContextData = async (
  date,
  setTimecardData
) => {

  const params = new UrlSearchParamBuilder()
    .setTenantId('00000000-0000-0000-0000-000000000000')
    .setFilters("ownerId==1", ...filterTimeEntriesOnDate(date))
    .getUrlSearchParams();
  const timeEntriesResponse = await getTimeEntries(params);

  if (
    timeEntriesResponse?.data?.items &&
    timeEntriesResponse.data.items.length > 0
  ) {
    const timeEntry = timeEntriesResponse.data.items[0];

    setTimecardData({
      timeEntryId: timeEntry.id,
      timePeriodType: timeEntry.shiftType,
      startDate: formatDate(timeEntry.actualStartTime),
      startTime: formatTime(timeEntry.actualStartTime),
      finishTime: timeEntry.actualEndTime
        ? formatTime(timeEntry.actualEndTime)
        : '',
      timePeriodTypeId: timeEntry.timePeriodTypeId,
    });
    return;
  }

  setTimecardData({
    timeEntryId: '',
    timePeriodType: '',
    startTime: '',
    finishTime: '',
    startDate: dayjs(date).format(),
    timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
  });
};

const Timecard = () => {
  const { date } = useParams();

  const previousDay = formatDate(dayjs(date).subtract(1, 'day'));
  const nextDay = formatDate(dayjs(date).add(1, 'day'));

  const { summaryErrors, timecardData, setTimecardData } = useTimecardContext();

  const desiredErrorOrder = [
    'shift-start-time',
    'shift-finish-time',
    'timePeriod',
  ];

  useEffect(() => {
    document.title = generateDocumentTitle('Timecard ');
    updateTimeEntryContextData(date, setTimecardData);
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

      {timecardData.timeEntryId || timecardData.timePeriodType ? (
        <EditShiftTimecard />
      ) : (
        <SelectTimecardPeriodType />
      )}
    </>
  );
};

export default Timecard;
