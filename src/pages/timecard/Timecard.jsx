import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import BackLink from '../../components/common/form/navigation/backlink/BackLink';
import SelectTimecardPeriodType from '../../components/timecard/select-timecard-period-type/SelectTimecardPeriodType';
import ErrorSummary from '../../components/common/form/error-summary/ErrorSummary';
import generateDocumentTitle from '../../utils/generate-document-title/generateDocumentTitle';
import { getTimeEntries } from '../../api/services/timecardService';
import {
  formatDate,
  getTimePeriodTypesMap,
  formatTime,
  isFinishTimeOnNextDay,
} from '../../utils/time-entry-utils/timeEntryUtils';
import { UrlSearchParamBuilder } from '../../utils/api-utils/UrlSearchParamBuilder';
import { validateServiceErrors } from '../../utils/api-utils/ApiUtils';
import EditShiftTimecard from '../../components/timecard/edit-shift-timecard/EditShiftTimecard';
import { useTimecardContext } from '../../context/TimecardContext';
import { useApplicationContext } from '../../context/ApplicationContext';

import { sortErrorKeys } from '../../utils/sort-errors/sortErrors';
import { buildTimeEntriesFilter } from '../../utils/filters/time-entry-filter/timeEntryFilterBuilder';
import { ContextTimeEntry } from '../../utils/time-entry-utils/ContextTimeEntry';
import SimpleTimePeriod from '../../components/timecard/simple-time-period/SimpleTimePeriod';
import AddTimeCardPeriod from '../../components/timecard/add-timecard-period/AddTimeCardPeriod';
import { inputNames } from '../../utils/constants';
import MessageSummary from '../../components/common/form/message-summary/MessageSummary';

const Timecard = () => {
  const {
    summaryErrors,
    timeEntries,
    setTimeEntries,
    setTimecardDate,
    newTimeEntry,
    setNewTimeEntry,
    summaryMessages,
    isAlertVisible,
  } = useTimecardContext();
  const { timePeriodTypes, setServiceError, userId } = useApplicationContext();
  const timePeriodTypesMap = getTimePeriodTypesMap(timePeriodTypes);

  const { date } = useParams();
  const previousDay = formatDate(dayjs(date).subtract(1, 'day'));
  const nextDay = formatDate(dayjs(date).add(1, 'day'));

  const desiredErrorOrder = [
    inputNames.shiftStartTime,
    inputNames.shiftFinishTime,
    'timePeriod',
  ];

  const desiredMessageOrder = ['delete', 'update', 'insert'];

  useEffect(() => {
    document.title = generateDocumentTitle('Timecard ');
    console.log('date: ', date);
    setTimecardDate(date);
    updateTimeEntryContextData(
      date,
      setTimeEntries,
      setServiceError,
      userId,
      previousDay,
      nextDay
    );
  }, [date, timePeriodTypes]);

  return (
    <>
      <BackLink text="Back to calendar" link="/calendar" />
      {isAlertVisible && Object.keys(summaryMessages).length !== 0 && (
        <MessageSummary
          messages={summaryMessages}
          keys={sortErrorKeys(summaryMessages, desiredMessageOrder)}
        />
      )}
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
          onClick={() => {
            setNewTimeEntry(false);
          }}
          className="govuk-link govuk-link--no-visited-state"
          to={`/timecard/${previousDay}`}
        >
          Previous day
        </Link>
        <Link
          onClick={() => {
            setNewTimeEntry(false);
          }}
          className="govuk-link govuk-link--no-visited-state"
          to={`/timecard/${nextDay}`}
        >
          Next day
        </Link>
        <Link
          onClick={() => {
            setNewTimeEntry(false);
          }}
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
              {renderTimeEntry(timePeriodTypesMap, timeEntry, index)}
            </div>
          ))}
          <AddTimeCardPeriod />
        </>
      )}
    </>
  );
};

const renderTimeEntry = (timePeriodTypesMap, timeEntry, index) => {
  switch (timePeriodTypesMap[timeEntry.timePeriodTypeId]) {
    case 'Shift':
      return (
        <EditShiftTimecard timeEntry={timeEntry} timeEntriesIndex={index} />
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

const updateTimeEntryContextData = async (
  date,
  setTimeEntries,
  setServiceError,
  userId
) => {
  const timeEntriesParams = new UrlSearchParamBuilder()
    .setTenantId('00000000-0000-0000-0000-000000000000')
    .setFilter(buildTimeEntriesFilter(date, userId))
    .getUrlSearchParams();

  validateServiceErrors(setServiceError, async () => {
    const timeEntriesResponse = await getTimeEntries(timeEntriesParams);

    const timeCardStart = dayjs(date).startOf('day').add(1, 'minute');

    console.log('timecardStart:', timeCardStart.toString());

    const timeCardEnd = dayjs(date).endOf('day');

    console.log('timecardEnd:', timeCardEnd.toString());

    if (timeEntriesResponse.data.items?.length > 0) {
      const filteredTimeEntries = timeEntriesResponse.data.items.filter(
        (timeEntry) => {
          return !(
            dayjs(timeEntry.actualEndTime).isBefore(timeCardStart) ||
            dayjs(timeEntry.actualStartTime).isAfter(timeCardEnd)
          );
        }
      );
      const existingTimeEntries = filteredTimeEntries.map((timeEntry) => {
        return new ContextTimeEntry(
          timeEntry.id,
          timeEntry.actualStartTime,
          timeEntry.actualEndTime ? timeEntry.actualEndTime : '',
          timeEntry.timePeriodTypeId,
          timeEntry.finishNextDay ??
            isFinishTimeOnNextDay(
              formatTime(timeEntry.actualStartTime),
              formatTime(timeEntry.actualEndTime)
            )
        );
      });

      console.log('existingTimeEntries: ', existingTimeEntries);

      setTimeEntries(existingTimeEntries);
    } else {
      setTimeEntries([]);
    }
  });
};

export default Timecard;
