import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

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
    newTimeEntry,
    setNewTimeEntry,
    summaryMessages,
    isAlertVisible,
    setSummaryMessages,
    setIsAlertVisible,
    isErrorVisible,
  } = useTimecardContext();
  const { setServiceError, userId } = useApplicationContext();

  const [timeEntries, setTimeEntries] = useState([]);

  let timePeriodTypes;

  const { date: timecardDate } = useParams();
  const previousDay = formatDate(dayjs(timecardDate).subtract(1, 'day'));
  const nextDay = formatDate(dayjs(timecardDate).add(1, 'day'));

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
    updateTimeEntryContextData(
      timecardDate,
      setTimeEntries,
      setServiceError,
      userId
    );
  };

  useEffect(() => {
    document.title = generateDocumentTitle('Timecard ');
    updateTimeEntryContextData(
      timecardDate,
      setTimeEntries,
      setServiceError,
      userId
    );

    timePeriodTypes = async () => {
      const params = new UrlSearchParamBuilder()
        .setTenantId('00000000-0000-0000-0000-000000000000')
        .getUrlSearchParams();

      validateServiceErrors(setServiceError, async () => {
        return await getTimePeriodTypes(params).data?.items;
      });
    };
  }, [timecardDate, timePeriodTypes, isErrorVisible]);

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
      <h2 className="govuk-heading-m">
        {dayjs(timecardDate).format('DD MMMM YYYY')}
      </h2>
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
        <SelectTimecardPeriodType
          timePeriodTypes={timePeriodTypes}
          timeEntries={timeEntries}
          setTimeEntries={setTimeEntries}
        />
      )}
      {!newTimeEntry && timeEntries.length !== 0 && (
        <TimecardEntriesList
          timecardDate={timecardDate}
          timeEntries={timeEntries}
          setTimeEntries={setTimeEntries}
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
