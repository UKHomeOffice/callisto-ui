import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  createTimeEntry,
  updateTimeEntry,
} from '../../../api/services/timecardService';
import { useApplicationContext } from '../../../context/ApplicationContext';

import StartFinishTimeInput from '../start-finish-time-input/StartFinishTimeInput';
import dayjs, { locale } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { UrlSearchParamBuilder } from '../../../utils/api-utils/UrlSearchParamBuilder';
import {
  formatDate,
  formatDateTimeISO,
  formatTime,
  removeTimecardContextEntry,
} from '../../../utils/time-entry-utils/timeEntryUtils';
import { ContextTimeEntry } from '../../../utils/time-entry-utils/ContextTimeEntry';
import {
  focusErrors,
  sortErrors,
} from '../../../utils/common-utils/common-utils';
import { validateServiceErrors } from '../../../utils/api-utils/ApiUtils';
import { useEffect, useState } from 'react';
import { clashingProperties, inputNames } from '../../../utils/constants';
import { combineExistingAndTimeClashErrors } from '../../../utils/time-entry-utils/combineTimeErrors';
import StartFinishDateInput from '../start-finish-date-input/StartFinishDateInput';
import Checkbox from '../../common/form/checkbox/Checkbox';
import { isFinishTimeOnNextDay } from '../../../utils/time-entry-utils/timeEntryUtils';

const EditShift = ({
  summaryErrors,
  setSummaryErrors,
  timecardDate,
  setShowEditShiftHours,
  timeEntry,
  timeEntriesIndex,
  timeEntries,
  setTimeEntries,
  setSummaryMessages,
  timePeriodTypesMap,
}) => {
  const { register, handleSubmit, formState, getValues } = useForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
  });

  const inputName = 'shift';
  const { setServiceError, userId } = useApplicationContext();
  const [isChecked, setIsChecked] = useState(false);
  const [clashingProperty, setClashingProperty] = useState(null);
  const [clashingTimes, setClashingTimes] = useState(null);

  const startEntryExists = !!timeEntry?.startTime && timeEntry.startTime !== '';
  const finishEntryExists =
    !!timeEntry?.finishTime && timeEntry.finishTime !== '';
  const [localStartDate, setLocalStartDate] = useState(
    startEntryExists ? timeEntry.startTime : timecardDate
  );
  const [localEndDate, setLocalEndDate] = useState(
    finishEntryExists ? timeEntry.finishTime : timecardDate
  );

  const [finishTimeText, setFinishTimeText] = useState('');

  useEffect(() => {
    focusErrors(document.querySelector('[id^="summary-error"] a'));
  }, [summaryErrors]);

  const handleCheckboxChange = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  const handleError = (errorFields) => {
    setSummaryErrors(errorFields);
  };

  const updateFinishTimeText = () => {
    if (timeEntry.finishNextDay) {
      setFinishTimeText('Finishes next day');
    } else if (dayjs(localStartDate).isAfter(dayjs(localEndDate))) {
      setFinishTimeText('');
    } else {
      const startTime = getValues(inputNames.shiftStartTime);
      const finishTime = getValues(inputNames.shiftFinishTime);
      const nextDay = isFinishTimeOnNextDay(startTime, finishTime);
      setFinishTimeText(nextDay ? 'Finishes next day' : '');
      if (nextDay) {
        timeEntry.finishNextDay = true;
      } else {
        timeEntry.finishNextDay = false;
      }

      setLocalEndDate(
        nextDay
          ? dayjs(localStartDate).add(1, 'day').toString()
          : localStartDate
      );
    }
  };

  const handleServerValidationErrors = (errors) => {
    if (errors === null || !Array.isArray(errors)) {
      return false;
    }
    let newErrors = [];
    let errorsHandled = true;

    for (const error of errors) {
      if (error.field === clashingProperties.startAndEndTime) {
        setClashingTimes(error.data);
        setClashingProperty(error.field);
        newErrors.push({
          key: 'bothDatesOverlapping',
          inputName: 'shift-start-time',
          message:
            'Your start and finish times must not overlap with another time period',
          errorPriority: 1,
        });
      } else if (error.field === clashingProperties.startTime) {
        setClashingTimes(error.data);
        setClashingProperty(error.field);
        newErrors.push({
          key: 'overlappingStart',
          inputName: 'shift-start-time',
          message: 'Your start time must not overlap with another time period',
          errorPriority: 1,
        });
      } else if (error.field === clashingProperties.endTime) {
        setClashingTimes(error.data);
        setClashingProperty(error.field);
        newErrors.push({
          key: 'overlappingFinish',
          inputName: 'shift-finish-time',
          message: 'Your finish time must not overlap with another time period',
          errorPriority: 2,
        });
      } else {
        errorsHandled = false;
        break;
      }
    }
    if (errorsHandled) {
      setSummaryErrors(newErrors);
      return true;
    }

    return false;
  };

  const onSubmit = async (formData) => {
    setSummaryErrors([]);
    const validatedData = validateSubmittedData(formData);

    if (validatedData.isValid) {
      const timecardPayload = {
        ownerId: userId,
        timePeriodTypeId: timeEntry.timePeriodTypeId,
        actualStartTime: validatedData.startDateTime,
        actualEndTime: validatedData.finishDateTime,
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
          if (response.status === 200) {
            //to be made better ^^
            if (
              startEntryExists &&
              hasShiftMovedFromTimecard(
                validatedData.startDateTime,
                validatedData.finishDateTime
              )
            ) {
              setMessages(
                validatedData.startDateTime,
                validatedData.finishDateTime
              );
              removeTimecardContextEntry(
                timeEntries,
                setTimeEntries,
                timeEntriesIndex
              );
            } else {
              setTimeEntries([
                ...timeEntries.slice(0, timeEntriesIndex),
                ContextTimeEntry.createFrom(timeEntry)
                  .setStartTime(validatedData.startDateTime)
                  .setFinishTime(validatedData.finishDateTime)
                  .setTimeEntryId(response.data.items[0].id),
                ...timeEntries.slice(timeEntriesIndex + 1),
              ]);
            }
            setShowEditShiftHours(false);
          }
        },
        true,
        handleServerValidationErrors
      );
    } else {
      handleError(validatedData.errors);
    }
  };
  const validateFormDates = (fieldType, formData, validatedData, newErrors) => {
    const day = `${fieldType}Date-day`;
    const month = `${fieldType}Date-month`;
    const year = `${fieldType}Date-year`;
    const priority = fieldType === 'start' ? 3 : 4;
    let datesValid = true;

    if (!formData[day]) {
      validatedData.isValid = false;
      datesValid = false;
      newErrors.push({
        key: `empty${fieldType}Day`,
        inputName: day,
        message: `Enter a ${fieldType} day`,
        errorPriority: priority,
      });
    }

    if (!formData[month]) {
      validatedData.isValid = false;
      datesValid = false;
      newErrors.push({
        key: `empty${fieldType}Month`,
        inputName: month,
        message: `Enter a ${fieldType} month`,
        errorPriority: priority,
      });
    }
    if (!formData[year]) {
      validatedData.isValid = false;
      datesValid = false;
      newErrors.push({
        key: `empty${fieldType}Year`,
        inputName: year,
        message: `Enter a ${fieldType} year`,
        errorPriority: priority,
      });
    }
    return datesValid;
  };

  const checkDateFormat = (fieldType, formData, validatedData, newErrors) => {
    const day = `${fieldType}Date-day`;
    const month = `${fieldType}Date-month`;
    const year = `${fieldType}Date-year`;
    const priority = fieldType === 'start' ? 3 : 4;

    if (!formData[day].match(/^([1-9]|0[1-9]|[12]\d|3[01])$/)) {
      if (!newErrors.some((error) => error.key === `empty${fieldType}Day`)) {
        newErrors.push({
          key: `invalid${fieldType}Day`,
          inputName: day,
          message: `Enter a valid ${fieldType} day`,
          errorPriority: priority,
        });
      }
      validatedData.isValid = false;
    }

    if (!formData[month].match(/^([1-9]|0[1-9]|1[012])$/)) {
      if (!newErrors.some((error) => error.key === `empty${fieldType}Month`)) {
        newErrors.push({
          key: `invalid${fieldType}Month`,
          inputName: month,
          message: `Enter a valid ${fieldType} month`,
          errorPriority: priority,
        });
      }
      validatedData.isValid = false;
    }

    if (!formData[year].match(/^\d{4}$/)) {
      if (!newErrors.some((error) => error.key === `empty${fieldType}Year`)) {
        newErrors.push({
          key: `invalid${fieldType}Year`,
          inputName: year,
          message: `Enter a valid ${fieldType} year`,
          errorPriority: priority,
        });
      }
      validatedData.isValid = false;
    }
  };

  const validateSubmittedData = (formData) => {
    if (!isChecked && isFinishTimeOnNextDay(localStartDate, localEndDate)) {
      setLocalEndDate(dayjs(localStartDate).add(1, 'day').toString());
    }

    const validatedData = {
      isValid: true,
    };
    //move to utils
    dayjs.extend(utc);
    let newErrors = [];

    const startTime = formData[`${inputName}-start-time`];
    const finishTime = formData[`${inputName}-finish-time`];

    if (!isTimeValid(startTime, 'start time')) {
      validatedData.isValid = false;
      newErrors.push({
        key: 'invalidStart',
        inputName: 'shift-start-time',
        message:
          'Enter a start time in the 24 hour clock format, for example, 08:00 or 0800',
        errorPriority: 1,
      });
    }

    if (!isTimeValid(finishTime, 'finish time')) {
      validatedData.isValid = false;
      newErrors.push({
        key: 'invalidEnd',
        inputName: 'shift-finish-time',
        message:
          'Enter a finish time in the 24 hour clock format, for example, 08:00 or 0800',
        errorPriority: 2,
      });
    }

    if (isChecked) {
      if (validateFormDates('start', formData, validatedData, newErrors)) {
        checkDateFormat('start', formData, validatedData, newErrors);
      }

      if (
        finishTime !== '' &&
        validateFormDates('finish', formData, validatedData, newErrors)
      ) {
        checkDateFormat('finish', formData, validatedData, newErrors);
      }
    }

    const actualStartDateTime = formatDateTimeISO(
      formatDate(localStartDate) + ' ' + startTime
    );

    let actualEndDateTime = '';
    if (finishTime) {
      const actualEndDate = formatDate(localEndDate);
      actualEndDateTime = formatDateTimeISO(actualEndDate + ' ' + finishTime);
    }

    if (
      dayjs(actualStartDateTime).isAfter(dayjs(actualEndDateTime)) &&
      isChecked
    ) {
      validatedData.isValid = false;
      newErrors.push({
        key: 'startAfterEnd',
        inputName: 'shift-start-time',
        message: 'Start time must be before end time',
        errorPriority: 1,
      });
    }
    const sortedErrors = sortErrors(newErrors);

    validatedData.startDateTime = actualStartDateTime;
    validatedData.finishDateTime = actualEndDateTime;
    validatedData.errors = sortedErrors;

    return validatedData;
  };

  const isTimeValid = (time, timeType) => {
    // Move to utils
    if (time.length < 3 && time.length > 0) {
      const hhTimeRegEx = /^(\d|[01]\d|2[0-3])$/;
      return hhTimeRegEx.test(time);
    } else if (time.length > 3 && time.length < 6) {
      const hhmmTimeRegEx = /^([01]\d|2[0-3]):?([0-5]\d)$/;
      return hhmmTimeRegEx.test(time);
    } else if (time.length == 0 && timeType === 'finish time') {
      return true;
    } else {
      return false;
    }
  };

  const hasShiftMovedFromTimecard = (startDate, endDate) => {
    const startTimecard = dayjs(timecardDate).startOf('day');
    const endTimecard = dayjs(timecardDate).endOf('day');
    const shiftStart = dayjs(startDate);
    const shiftEnd = dayjs(endDate);

    const singleDateMoved =
      !finishEntryExists &&
      (shiftStart.isBefore(startTimecard) || shiftStart.isAfter(endTimecard));

    const bothDatesMoved =
      finishEntryExists &&
      (shiftStart.isAfter(endTimecard) || shiftEnd.isBefore(startTimecard));

    if (singleDateMoved || bothDatesMoved) {
      return true;
    }
    return false;
  };

  const setMessages = (startDate, endDate) => {
    const formattedStart = formatDate(startDate);
    const formattedEnd = formatDate(endDate);
    const newSummaryMessages = [];

    if (startDate !== '' && endDate !== '') {
      newSummaryMessages.push({
        key: 'datesMoved',
        template: `DatesMoved`,
        variables: { startDate: formattedStart, endDate: formattedEnd },
      });
      setSummaryMessages(newSummaryMessages);
    } else {
      newSummaryMessages.push({
        key: 'datesMoved',
        template: `DatesMoved`,
        variables: { startDate: formattedStart },
      });
      setSummaryMessages(newSummaryMessages);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StartFinishTimeInput
          name={inputName}
          errors={combineExistingAndTimeClashErrors(
            summaryErrors,
            clashingProperty,
            clashingTimes,
            timePeriodTypesMap
          )}
          startTimeValue={
            timeEntry.startTime ? formatTime(timeEntry.startTime) : ''
          }
          finishTimeValue={
            timeEntry.finishTime ? formatTime(timeEntry.finishTime) : ''
          }
          register={register}
          updateFinishTimeText={updateFinishTimeText}
          finishTimeText={finishTimeText}
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
            errors={combineExistingAndTimeClashErrors(
              summaryErrors,
              clashingProperty,
              clashingTimes,
              timePeriodTypesMap
            )}
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

export default EditShift;
EditShift.propTypes = {
  summaryErrors: PropTypes.array,
  setSummaryErrors: PropTypes.func,
  timecardDate: PropTypes.string,
  timeEntry: PropTypes.object,
  timeEntriesIndex: PropTypes.number,
  setShowEditShiftHours: PropTypes.func,
  timeEntries: PropTypes.array,
  setTimeEntries: PropTypes.func,
  setSummaryMessages: PropTypes.func,
  timePeriodTypesMap: PropTypes.any,
};
