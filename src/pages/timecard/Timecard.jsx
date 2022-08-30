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
import { getSingleTimeEntryResponseItem, formatTime, formatDate } from '../../utils/timeEntryUtils/timeEntryUtils';
import { TimeEntryQueryParams } from '../../utils/timeEntryUtils/TimeEntryQueryParams';


const updateTimeEntryContextData = async (timecardData, setTimecardData) => {
  try {
    const timeEntriesResponse = await getTimeEntries(new TimeEntryQueryParams()
      .setTenantId('00000000-0000-0000-0000-000000000000').setFilter('ownerId==1').getUrlSearchParams());

    if (timeEntriesResponse && timeEntriesResponse.data) {
      const timeEntry = getSingleTimeEntryResponseItem(timeEntriesResponse.data);
      setTimecardData({
        ...timecardData,
        startDate: formatDate(timeEntry.actualStartTime),
        startTime: formatTime(timeEntry.actualStartTime),
        finishTime: timeEntry.actualEndTime ? formatTime(timeEntry.actualEndTime) : '',
        id: timeEntry.id
      });
    }
  } catch (error) {
    /* TODO: Error handling when server raises error*/
    console.log(error);
  }
}


const Timecard = () => {
  const { date } = useParams();
  const utcDate = dayjs(date).format();

  const previousDay = dayjs(date).subtract(1, 'day').format('YYYY-MM-DD');
  const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD');

  const { summaryErrors, timecardData, setTimecardData } = useTimecardContext();

  useEffect(() => {
    document.title = generateDocumentTitle('Timecard ');    
    if (!timecardData.id) updateTimeEntryContextData(timecardData, setTimecardData);

    setTimecardData({
      ...timecardData,
      startDate: utcDate,
    });
  }, [date]);

  return (
    <>
      <BackLink text="Back to calendar" link="/calendar" />
      {summaryErrors && Object.keys(summaryErrors).length !== 0 && (
        <ErrorSummary errors={summaryErrors} />
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

      {(timecardData.id || timecardData.timePeriodType) 
        ? <EditShiftTimecard /> 
        : <SelectTimecardPeriodType />}
    </>
  );
};

export default Timecard;
