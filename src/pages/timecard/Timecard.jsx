/* eslint-disable prettier/prettier */
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import BackLink from '../../components/common/form/navigation/backlink/BackLink';
import SelectTimecardPeriodType from '../../components/timecard/select-timecard-period-type/SelectTimecardPeriodType';
import ErrorSummary from '../../components/common/form/error-summary/ErrorSummary';
import generateDocumentTitle from '../../utils/generate-document-title/generateDocumentTitle';
import { getTimeEntries, getTimePeriodTypes } from '../../api/services/timecardService';
import {
  formatDate,
  formatTime,
  isFinishTimeOnNextDay,
} from '../../utils/time-entry-utils/timeEntryUtils';
import { UrlSearchParamBuilder } from '../../utils/api-utils/UrlSearchParamBuilder';
import { validateServiceErrors } from '../../utils/api-utils/ApiUtils';
import { useApplicationContext } from '../../context/ApplicationContext';
import { buildTimeEntriesFilter } from '../../utils/filters/time-entry-filter/timeEntryFilterBuilder';
import { ContextTimeEntry } from '../../utils/time-entry-utils/ContextTimeEntry';
import MessageSummary from '../../components/common/form/message-summary/MessageSummary';
import TimecardEntriesList from '../../components/timecard/timecard-entries-list/TimecardEntriesList';
import AddTimeCardPeriod from '../../components/timecard/add-timecard-period/AddTimeCardPeriod';

const Timecard = () => {
  const { setServiceError, userId } = useApplicationContext();
  const [summaryMessages, setSummaryMessages] = useState([]);
  const [addNewTimeEntry, setAddNewTimeEntry] = useState();

  const params = new UrlSearchParamBuilder()
    .setTenantId('00000000-0000-0000-0000-000000000000')
    .getUrlSearchParams();

  const [summaryErrors, setSummaryErrors] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [timePeriodTypes, setTimePeriodTypes] = useState([]);

  const { date: timecardDate } = useParams();
  const previousDay = formatDate(dayjs(timecardDate).subtract(1, 'day'));
  const nextDay = formatDate(dayjs(timecardDate).add(1, 'day'));

  useEffect(async () => {
    document.title = generateDocumentTitle('Timecard ');
    const fetchTimePeriodTypeData = async () => {
      const periodTypes = await getTimePeriodTypes(params);
      const periodItems = periodTypes.data?.items;
      setTimePeriodTypes(periodItems);
    };
    await fetchTimePeriodTypeData();

    await updateTimeEntryContextData(
      timecardDate,
      setTimeEntries,
      setServiceError,
      userId
    );
  }, [timecardDate]);

  const clearMessageSummary = () => {
    setSummaryMessages([]);
  };

  const clearErrorSummary = () => {
    setSummaryErrors([]);
  };

  return (
    <>
      <BackLink text="Back to calendar" link="/calendar" />
      {summaryMessages && summaryMessages.length !== 0 && (
        <MessageSummary
          summaryMessages={summaryMessages}
          setSummaryMessages={setSummaryMessages}
        />
      )}
      {summaryErrors && summaryErrors.length !== 0 && (
        <ErrorSummary errors={summaryErrors} />
      )}
      <h1 className="govuk-caption-m">My Timecard</h1>
      <h2 className="govuk-heading-m">
        {dayjs(timecardDate).format('D MMMM YYYY')}
      </h2>
      <div className="govuk-button-group button-group-row">
        <Link
          onClick={() => {
            clearMessageSummary();
            clearErrorSummary();
          }}
          className="govuk-link govuk-link--no-visited-state"
          to={`/timecard/${previousDay}`}
        >
          Previous day
        </Link>
        <Link
          onClick={() => {
            clearMessageSummary();
            clearErrorSummary();
          }}
          className="govuk-link govuk-link--no-visited-state"
          to={`/timecard/${nextDay}`}
        >
          Next day
        </Link>
        <Link
          onClick={() => {
            clearMessageSummary();
            clearErrorSummary();
          }}
          className="govuk-link govuk-link--no-visited-state"
          to="/calendar"
        >
          Select another date
        </Link>
      </div>

      {timePeriodTypes.length === 0 && (
        <div className="loaderWrapper">
          <div className="loader">
            <img
              src="/static/emblem.jpg"
              alt="Home Office emblem"
              className="rounded"
            />
            <img src="/static/spinner.gif" alt="Loading spinner" />
          </div>
        </div>
      )}
      {timePeriodTypes.length > 0 && (
        <>
          {(timeEntries.length === 0 || addNewTimeEntry) && (
            <SelectTimecardPeriodType
              summaryErrors={summaryErrors}
              setSummaryErrors={setSummaryErrors}
              timePeriodTypes={timePeriodTypes}
              timeEntries={timeEntries}
              setTimeEntries={setTimeEntries}
              setAddNewTimeEntry={setAddNewTimeEntry}
            />
          )}
          {timeEntries.length !== 0 && !addNewTimeEntry && (
            <>
              <TimecardEntriesList
                summaryErrors={summaryErrors}
                setSummaryErrors={setSummaryErrors}
                timecardDate={timecardDate}
                timeEntries={timeEntries}
                setTimeEntries={setTimeEntries}
                timePeriodTypes={timePeriodTypes}
                summaryMessages={summaryMessages}
                setSummaryMessages={setSummaryMessages}
              />
              <AddTimeCardPeriod
                setSummaryErrors={setSummaryErrors}
                setAddNewTimeEntry={setAddNewTimeEntry}
              />
            </>
          )}
        </>
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

  await validateServiceErrors(setServiceError, async () => {
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
