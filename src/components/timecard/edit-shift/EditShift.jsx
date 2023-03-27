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
} from '../../../utils/time-entry-utils/timeEntryUtils';
import { ContextTimeEntry } from '../../../utils/time-entry-utils/ContextTimeEntry';
import {
  deepCloneJson,
  focusErrors,
} from '../../../utils/common-utils/common-utils';
import { validateServiceErrors } from '../../../utils/api-utils/ApiUtils';
import { useEffect, useState } from 'react';
import {
  clashingProperties,
  inputNames,
  messageKeys,
} from '../../../utils/constants';
import { combineExistingAndTimeClashErrors } from '../../../utils/time-entry-utils/combineTimeErrors';
import StartFinishDateInput from '../start-finish-date-input/StartFinishDateInput';
import Checkbox from '../../common/form/checkbox/Checkbox';

const EditShift = ({
  summaryErrors,
  setSummaryErrors,
  timecardDate,
  setShowEditShiftHours,
  timeEntry,
  timeEntriesIndex,
  hasShiftMovedCallback,
  timeEntries,
  setTimeEntries,
  summaryMessages,
  setSummaryMessages,
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

  const { setIsAlertVisible } = useTimecardContext();

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

  // const handleServerValidationErrors = (errors) => {
  //   if (errors === null || !Array.isArray(errors)) {
  //     return false;
  //   }
  //   const summaryErrors = {};
  //   let errorsHandled = true;

  //   for (const error of errors) {
  //     if (error.field === clashingProperties.startAndEndTime) {
  //       setClashingTimes(error.data);
  //       setClashingProperty(error.field);
  //       summaryErrors[inputNames.shiftStartTime] = {
  //         message:
  //           'Your start and finish times must not overlap with another time period',
  //       };
  //     } else if (error.field === clashingProperties.startTime) {
  //       setClashingTimes(error.data);
  //       setClashingProperty(error.field);
  //       summaryErrors[inputNames.shiftStartTime] = {
  //         message: 'Your start time must not overlap with another time period',
  //       };
  //     } else if (error.field === clashingProperties.endTime) {
  //       setClashingTimes(error.data);
  //       setClashingProperty(error.field);
  //       summaryErrors[inputNames.shiftFinishTime] = {
  //         message: 'Your finish time must not overlap with another time period',
  //       };
  //     } else {
  //       errorsHandled = false;
  //       break;
  //     }
  //   }
  //   if (errorsHandled) {
  //     setSummaryErrors(summaryErrors);
  //     return true;
  //   }

  //   return false;
  // };

  const onSubmit = async (formData) => {
    const validatedData = validateSubmittedData(formData);

    if (validatedData.isValid) {
      const timecardPayload = {
        ownerId: userId,
        timePeriodTypeId: timeEntry.timePeriodTypeId,
        actualStartTime: validatedData.startDateTime,
        actualEndTime: validatedData.finishDateTime,
      };

      const params = new UrlSearchParamBuilder()
        .setTenantId('00000000-0000-0000-0000-000000000000')
        .getUrlSearchParams();

      const response = !timeEntry.timeEntryId
        ? await createTimeEntry(timecardPayload, params)
        : await updateTimeEntry(timeEntry.timeEntryId, timecardPayload, params);
      if (response.status === 200) {
        if (startEntryExists) {
          //to be made better
          setTimeEntries([
            ...timeEntries.slice(0, timeEntriesIndex),
            ContextTimeEntry.createFrom(timeEntry)
              .setStartTime(validatedData.startDateTime)
              .setFinishTime(validatedData.finishDateTime),
            ...timeEntries.slice(timeEntriesIndex + 1),
          ]);
        } else {
          setTimeEntries([
            ...timeEntries,
            ContextTimeEntry.createFrom(timeEntry)
              .setStartTime(validatedData.startDateTime)
              .setFinishTime(validatedData.finishDateTime)
              .setTimeEntryId(response.data.items[0].id),
          ]).push();
        }
      } else {
        // Handle response errors here
      }
    } else {
      handleError(validatedData.errors);
    }
  };

  const validateSubmittedData = (formData) => {
    //move to utils
    dayjs.extend(utc);

    let newErrors = [];

    const startTime = formData[`${inputName}-start-time`];
    const finishTime = formData[`${inputName}-finish-time`];

    let isValid = true;
    if (!isTimeValid(startTime, 'start time')) {
      isValid = false;
      newErrors.push({
        key: 'invalidStart',
        inputName: 'shift-start-time',
        message:
          'Enter a start time in the 24 hour clock format, for example, 08:00 or 0800',
        errorPriority: 1,
      });
    }

    if (!isTimeValid(finishTime, 'finish time')) {
      isValid = false;
      newErrors.push({
        key: 'invalidEnd',
        inputName: 'shift-finish-time',
        message:
          'Enter a finish time in the 24 hour clock format, for example, 08:00 or 0800',
        errorPriority: 2,
      });
    }

    if (!dayjs(localStartDate).isValid || !dayjs(localEndDate).isValid) {
      isValid = false;
    }

    const actualStartDateTime = formatDateTimeISO(
      formatDate(localStartDate) + ' ' + startTime
    );

    let actualEndDateTime = '';
    if (finishTime) {
      const actualEndDate = formatDate(localEndDate);
      actualEndDateTime = formatDateTimeISO(actualEndDate + ' ' + finishTime);
    }

    if (dayjs(actualStartDateTime).isAfter(dayjs(actualEndDateTime))) {
      isValid = false;
      newErrors.push({
        key: 'startAfterEnd',
        inputName: 'shift-start-time',
        message: 'Start time must be before end time',
        errorPriority: 1,
      });
    }

    if (
      startEntryExists &&
      hasShiftMovedFromTimecard(actualStartDateTime, actualEndDateTime)
    ) {
      setMessages(actualStartDateTime, actualEndDateTime);
    }

    const sortedErrors = sortErrors(newErrors);

    const validatedData = {
      isValid: isValid,
      startDateTime: actualStartDateTime,
      finishDateTime: actualEndDateTime,
      errors: sortedErrors,
    };

    return validatedData;
  };

  const sortErrors = (errors) => {
    return errors.sort((a, b) => (a.errorPriority > b.errorPriority ? 1 : -1));
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
      hasShiftMovedCallback();
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
      setIsAlertVisible(true);
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

export default EditShift;
EditShift.propTypes = {
  summaryErrors: PropTypes.array,
  setSummaryErrors: PropTypes.func,
  timecardDate: PropTypes.string,
  timeEntry: PropTypes.object,
  timeEntriesIndex: PropTypes.number,
  setShowEditShiftHours: PropTypes.func,
  hasShiftMovedCallback: PropTypes.func,
  timeEntries: PropTypes.array,
  setTimeEntries: PropTypes.func,
  summaryMessages: PropTypes.array,
  setSummaryMessages: PropTypes.func,
};
