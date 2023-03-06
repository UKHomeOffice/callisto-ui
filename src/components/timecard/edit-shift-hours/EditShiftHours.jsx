import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  createTimeEntry,
  updateTimeEntry,
} from '../../../api/services/timecardService';
import { useTimecardContext } from '../../../context/TimecardContext';
import { useApplicationContext } from '../../../context/ApplicationContext';

import StartFinishTimeInput from '../start-finish-time-input/StartFinishTimeInput';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { UrlSearchParamBuilder } from '../../../utils/api-utils/UrlSearchParamBuilder';
import {
  formatDate,
  formatDateTimeISO,
  formatTime,
  formatDateNoYear,
  formatJustDay,
} from '../../../utils/time-entry-utils/timeEntryUtils';
import { ContextTimeEntry } from '../../../utils/time-entry-utils/ContextTimeEntry';
import {
  deepCloneJson,
  focusErrors,
} from '../../../utils/common-utils/common-utils';
import { validateServiceErrors } from '../../../utils/api-utils/ApiUtils';
import { useEffect, useState } from 'react';
import { clashingProperties, inputNames } from '../../../utils/constants';
import { combineExistingAndTimeClashErrors } from '../../../utils/time-entry-utils/combineTimeErrors';
import StartFinishDateInput from '../start-finish-date-input/StartFinishDateInput';
import Checkbox from '../../common/form/checkbox/Checkbox';
import { useNavigate } from 'react-router-dom';

const EditShiftHours = ({
  setShowEditShiftHours,
  timeEntry,
  timeEntriesIndex,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    getValues,
  } = useForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
  });

  const inputName = 'shift';
  const { setServiceError, userId } = useApplicationContext();
  const [isChecked, setIsChecked] = useState(false);
  const [clashingProperty, setClashingProperty] = useState(null);
  const [clashingTimes, setClashingTimes] = useState(null);
  const navigate = useNavigate();

  const {
    timeEntries,
    setTimeEntries,
    timecardDate,
    summaryErrors,
    setSummaryErrors,
    setIsAlertVisible,
    summaryMessages,
    setSummaryMessages,
    isAlertVisible,
  } = useTimecardContext();

  const startEntryExists = !!timeEntry?.startTime && timeEntry.startTime !== '';
  const finishEntryExists =
    !!timeEntry?.finishTime && timeEntry.finishTime !== '';
  const [localStartDate, setLocalStartDate] = useState(
    startEntryExists ? timeEntry.startTime : timecardDate
  );
  const [localEndDate, setLocalEndDate] = useState(
    finishEntryExists ? timeEntry.finishTime : timecardDate
  );

  useEffect(() => {
    focusErrors(document.getElementById('summary-error-0-message'));
  }, [summaryErrors]);

  useEffect(() => {
    if (summaryMessages && Object.keys(summaryMessages).length !== 0) {
      setTimeout(() => setIsAlertVisible(false), 10000);
    }
  }, [isAlertVisible]);

  const handleCheckboxChange = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  const handleError = (errorFields) => {
    setSummaryErrors(errorFields);
  };

  const getFinishTimeDate = (actualStartDate) => {
    if (timeEntry.finishNextDay) {
      return formatDate(dayjs(actualStartDate).add(1, 'day'));
    } else {
      return actualStartDate;
    }
  };

  const handleServerValidationErrors = (errors) => {
    if (errors === null || !Array.isArray(errors)) {
      return false;
    }
    const summaryErrors = {};
    let errorsHandled = true;

    for (const error of errors) {
      if (error.field === clashingProperties.startAndEndTime) {
        setClashingTimes(error.data);
        setClashingProperty(error.field);
        summaryErrors[inputNames.shiftStartTime] = {
          message:
            'Your start and finish times must not overlap with another time period',
        };
      } else if (error.field === clashingProperties.startTime) {
        setClashingTimes(error.data);
        setClashingProperty(error.field);
        summaryErrors[inputNames.shiftStartTime] = {
          message: 'Your start time must not overlap with another time period',
        };
      } else if (error.field === clashingProperties.endTime) {
        setClashingTimes(error.data);
        setClashingProperty(error.field);
        summaryErrors[inputNames.shiftFinishTime] = {
          message: 'Your finish time must not overlap with another time period',
        };
      } else {
        errorsHandled = false;
        break;
      }
    }
    if (errorsHandled) {
      setSummaryErrors(summaryErrors);
      return true;
    }

    return false;
  };

  const setMessages = (startDate, endDate, datesMoved) => {
    if (datesMoved) {
      const formattedStart = formatDateNoYear(startDate);
      const formattedEnd = formatDateNoYear(endDate);
      const message = finishEntryExists
        ? `Timecard has been updated to start on ${formattedStart} and end on ${formattedEnd}`
        : `Timecard has been updated to start on ${formattedStart}`;
      summaryMessages['update'] = {
        message: message,
      };
    } else {
      const formattedTimecard = formatDateNoYear(timecardDate);
      summaryMessages['update'] = {
        message: `Timecard has been updated, it now starts and ends on ${formattedTimecard}`,
      };
    }

    setSummaryMessages(summaryMessages);
    setIsAlertVisible(true);
  };

  const onSubmit = async (formData) => {
    dayjs.extend(utc);

    const actualStartDate = formatDate(localStartDate);
    const actualStartTime = formData[`${inputName}-start-time`];
    const actualStartDateTime = formatDateTimeISO(
      actualStartDate + ' ' + actualStartTime
    );

    const endTime = formData[`${inputName}-finish-time`] || null;
    let actualEndDateTime = '';
    if (endTime) {
      const actualEndDate = timeEntry.finishNextDay
        ? getFinishTimeDate(actualStartDate)
        : formatDate(localEndDate);
      actualEndDateTime = formatDateTimeISO(actualEndDate + ' ' + endTime);
    }

    const timecardPayload = {
      ownerId: userId,
      timePeriodTypeId: timeEntry.timePeriodTypeId,
      actualStartTime: actualStartDateTime,
      actualEndTime: actualEndDateTime,
    };

    validateServiceErrors(
      setServiceError,
      async () => {
        const params = new UrlSearchParamBuilder()
          .setTenantId('00000000-0000-0000-0000-000000000000')
          .getUrlSearchParams();

        const response = !timeEntry.timeEntryId
          ? await createTimeEntry(timecardPayload, params)
          : await updateTimeEntry(
              timeEntry.timeEntryId,
              timecardPayload,
              params
            );

        if (response?.data?.items?.length > 0) {
          const responseItem = response.data.items[0];
          const formattedStartTime = responseItem.actualStartTime;
          const formattedEndTime = responseItem.actualEndTime
            ? responseItem.actualEndTime
            : '';

          const newTimeEntries = deepCloneJson(timeEntries);
          newTimeEntries[timeEntriesIndex] = ContextTimeEntry.createFrom(
            timeEntry
          )
            .setStartTime(formattedStartTime)
            .setFinishTime(formattedEndTime)
            .setTimeEntryId(responseItem.id)
            .setFinishNextDay(timeEntry.finishNextDay);

          let datesMoved = setDatesMoved(
            actualStartDateTime,
            actualEndDateTime
          );

          if (startEntryExists) {
            setMessages(actualStartDateTime, actualEndDateTime, datesMoved);
          }
          setTimeEntries(newTimeEntries);
          setSummaryErrors({});
          setShowEditShiftHours(false);
        }
      },
      true,
      handleServerValidationErrors
    );
  };

  const setDatesMoved = (actualStartDateTime, actualEndDateTime) => {
    const currentDay = formatJustDay(timecardDate);
    const newStartDay = formatJustDay(actualStartDateTime);
    const newEndDay = formatJustDay(actualEndDateTime);

    let datesMoved = false;
    let redirectTarget;
    if (currentDay !== newStartDay) {
      datesMoved = true;
      redirectTarget = `/timecard/${formatDate(actualStartDateTime)}`;
      navigate(redirectTarget);
    } else if (currentDay !== newEndDay) {
      datesMoved = true;
      redirectTarget = `/timecard/${formatDate(actualEndDateTime)}`;
      navigate(redirectTarget);
    }

    return datesMoved;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <StartFinishTimeInput
          name={inputName}
          errors={combineExistingAndTimeClashErrors(
            errors,
            summaryErrors,
            clashingProperty,
            clashingTimes
          )}
          register={register}
          formState={formState}
          getFormValues={getValues}
          timeEntry={timeEntry}
          startTimeValue={
            timeEntry.startTime ? formatTime(timeEntry.startTime) : ''
          }
          finishTimeValue={
            timeEntry.finishTime ? formatTime(timeEntry.finishTime) : ''
          }
          timeEntriesIndex={timeEntriesIndex}
        />
        <Checkbox
          text="View or edit dates"
          name="viewOrEditDates"
          checked={isChecked}
          handleChange={handleCheckboxChange}
        />
        {isChecked && (
          <StartFinishDateInput
            name="Date"
            errors={errors}
            startTimeValue={localStartDate}
            finishTimeValue={localEndDate}
            startEntryExists={startEntryExists}
            timecardDate={timecardDate}
            register={register}
            formState={formState}
            finishNextDay={timeEntry.finishNextDay}
            getFormValues={getValues}
            setStartDate={setLocalStartDate}
            setEndDate={setLocalEndDate}
          />
        )}
        <div className="govuk-button-group">
          <button className="govuk-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditShiftHours;
EditShiftHours.propTypes = {
  timeEntry: PropTypes.object,
  timeEntriesIndex: PropTypes.number,
  setShowEditShiftHours: PropTypes.func,
};
