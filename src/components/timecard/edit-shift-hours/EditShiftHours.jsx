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
import { useEffect } from 'react';

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
  const { setServiceError } = useApplicationContext();
  const {
    timeEntries,
    setTimeEntries,
    timecardDate,
    summaryErrors,
    setSummaryErrors,
  } = useTimecardContext();

  useEffect(() => {
    focusErrors(document.getElementById('summary-error-0-message'));
  }, [summaryErrors]);

  const { userId } = useApplicationContext();

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

  const handleServerValidationErrors = (error) => {
    const summaryErrors = {};
    let errorsHandled = true;

    if (
      error ==
      ' has the following error(s): Time periods must not overlap with another time period'
    ) {
      summaryErrors['shift-start-time'] = {
        message: 'Time periods must not overlap with another time period',
      };
    } else {
      errorsHandled = false;
    }

    if (errorsHandled) {
      setSummaryErrors(summaryErrors);
      return true;
    }
    return false;
  };

  const onSubmit = async (formData) => {
    dayjs.extend(utc);

    const actualStartDate = formatDate(timecardDate);
    const actualStartTime = formData[`${inputName}-start-time`];
    const actualStartDateTime = formatDateTimeISO(
      actualStartDate + ' ' + actualStartTime
    );

    const endTime = formData[`${inputName}-finish-time`] || null;
    let actualEndDateTime = '';
    if (endTime) {
      const actualEndDate = getFinishTimeDate(actualStartDate);
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

          setTimeEntries(newTimeEntries);
          setSummaryErrors({});
          setShowEditShiftHours(false);
        }
      },
      handleServerValidationErrors
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <StartFinishTimeInput
          name={inputName}
          errors={Object.keys(errors).length > 0 ? errors : summaryErrors}
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
