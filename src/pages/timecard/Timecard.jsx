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
  formatTime,
  isFinishTimeOnNextDay,
} from '../../utils/time-entry-utils/timeEntryUtils';
import { UrlSearchParamBuilder } from '../../utils/api-utils/UrlSearchParamBuilder';
import { validateServiceErrors } from '../../utils/api-utils/ApiUtils';
import { useTimecardContext } from '../../context/TimecardContext';
import { useApplicationContext } from '../../context/ApplicationContext';

import { sortErrorKeys } from '../../utils/sort-errors/sortErrors';
import { buildTimeEntriesFilter } from '../../utils/filters/time-entry-filter/timeEntryFilterBuilder';
import { ContextTimeEntry } from '../../utils/time-entry-utils/ContextTimeEntry';
import { inputNames, messageKeys } from '../../utils/constants';
import MessageSummary from '../../components/common/form/message-summary/MessageSummary';
import TimecardEntriesList from '../../components/timecard/timecard-entries-list/TimecardEntriesList';

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
    setSummaryMessages,
    setIsAlertVisible,
    isErrorVisible,
  } = useTimecardContext();
  const { timePeriodTypes, setServiceError, userId } = useApplicationContext();

  const { date } = useParams();
  const previousDay = formatDate(dayjs(date).subtract(1, 'day'));
  const nextDay = formatDate(dayjs(date).add(1, 'day'));

  const desiredErrorOrder = [
    inputNames.shiftStartTime,
    inputNames.shiftFinishTime,
    'timePeriod',
  ];

  const desiredMessageOrder = [
    messageKeys.delete,
    messageKeys.update,
    messageKeys.insert,
  ];

  const hasShiftMovedFromTimecardCallback = () => {
    updateTimeEntryContextData(date, setTimeEntries, setServiceError, userId);
  };

  useEffect(() => {
    document.title = generateDocumentTitle('Timecard ');
    setTimecardDate(date);
    updateTimeEntryContextData(date, setTimeEntries, setServiceError, userId);
  }, [date, timePeriodTypes, isErrorVisible]);

  const clearMessageSummary = () => {
    setSummaryMessages({});
    setIsAlertVisible(false);
  };

  return (
    <>
      <BackLink text="Back to calendar" link="/calendar" />
      {isAlertVisible && Object.keys(summaryMessages).length !== 0 && (
        <MessageSummary
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
            clearMessageSummary();
          }}
          className="govuk-link govuk-link--no-visited-state"
          to={`/timecard/${previousDay}`}
        >
          Previous day
        </Link>
        <Link
          onClick={() => {
            setNewTimeEntry(false);
            clearMessageSummary();
          }}
          className="govuk-link govuk-link--no-visited-state"
          to={`/timecard/${nextDay}`}
        >
          Next day
        </Link>
        <Link
          onClick={() => {
            setNewTimeEntry(false);
            clearMessageSummary();
          }}
          className="govuk-link govuk-link--no-visited-state"
          to="/calendar"
        >
          Select another date
        </Link>
      </div>

      {(newTimeEntry || timeEntries.length === 0) && (
        <SelectTimecardPeriodType />
      )}
      {!newTimeEntry && timeEntries.length !== 0 && (
        <TimecardEntriesList
          timeEntries={timeEntries}
          timePeriodTypes={timePeriodTypes}
          hasShiftMovedCallback={hasShiftMovedFromTimecardCallback}
        />
      )}
    </>
  );
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

  const timeCardStart = dayjs(date).startOf('day').add(1, 'minute');
  const timeCardEnd = dayjs(date).endOf('day');

  validateServiceErrors(setServiceError, async () => {
    const timeEntriesResponse = await getTimeEntries(timeEntriesParams);

    if (timeEntriesResponse.data.items?.length > 0) {
      const filteredTimeEntries = timeEntriesResponse.data.items.filter(
        (timeEntry) => {
          return !(
            dayjs(timeEntry.actualEndTime).isBefore(timeCardStart) ||
            dayjs(timeEntry.actualStartTime).isAfter(timeCardEnd) ||
            (dayjs(timeEntry.actualStartTime).isBefore(timeCardStart) &&
              !timeEntry.actualEndTime)
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
      setTimeEntries(existingTimeEntries);
    } else {
      setTimeEntries([]);
    }
  });
};

export default Timecard;
