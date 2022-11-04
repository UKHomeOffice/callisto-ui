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
import { deepCloneJson } from '../../../utils/common-utils/common-utils';
import { validateServiceErrors } from '../../../utils/api-utils/ApiUtils';
import { useState } from 'react';

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
  } = useForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
  });

  const inputName = 'shift';
  const { setServiceError, userId } = useApplicationContext();
  const {
    timeEntries,
    setTimeEntries,
    timecardDate,
    summaryErrors,
    setSummaryErrors,
  } = useTimecardContext();
  const [clashingProperty, setClashingProperty] = useState(null);
  const [clashingTimes, setClashingTimes] = useState(null);

  const handleError = (errorFields) => {
    setSummaryErrors(errorFields);
  };

  const formatTimeClashes = (timeClashes) => {
    if (timeClashes.length > 1) {
      var times = (
        <div>
          <p>You are already assigned to the following time periods:</p>
          <ul>
            {timeClashes.map((clash) => (
              <li key="foo">{shiftClashToText(clash)}</li>
            ))}
          </ul>
        </div>
      );
      return times;
    } else {
      var clash = timeClashes[0];
      var startTime = Date.parse(clash.startTime);
      var endTime = Date.parse(clash.endTime);
      var text;
      if (clash.timePeriodTypeId == '00000000-0000-0000-0000-000000000001') {
        text = `You are already assigned to work from ${formatTime(
          startTime
        )} to ${formatTime(endTime)} on ${formatDate(startTime)}`;
      } else {
        console.log('here');
        text = `You are already assigned a scheduled rest day on ${formatDate(
          startTime
        )}`;
      }
      return <p>{text}</p>;
    }
  };

  const shiftClashToText = (clash) => {
    var startTime = Date.parse(clash.startTime);
    var endTime = Date.parse(clash.endTime);
    var clashText = `${formatTime(startTime)} to ${formatTime(
      endTime
    )} on ${formatDate(startTime)}`;
    return clashText;
  };

  const handleServerValidationErrors = (error) => {
    const summaryErrors = {};
    let errorsHandled = true;

    var firstError = error[0];
    setClashingTimes(firstError.data);
    setClashingProperty(firstError.field);

    if (firstError.field == 'startAndEndTime') {
      summaryErrors['shift-start-time'] = {
        message:
          'Your start and finish times must not overlap with another time period',
      };
    } else if (firstError.field == 'startTime') {
      summaryErrors['shift-start-time'] = {
        message: 'Your start time must not overlap with another period',
      };
    } else if (firstError.field == 'endTime') {
      summaryErrors['shift-finish-time'] = {
        message: 'Your end time must not overlap with another period',
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
    const actualEndDateTime = endTime
      ? formatDateTimeISO(actualStartDate + ' ' + endTime)
      : '';

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
          const formattedStartTime = formatTime(responseItem.actualStartTime);
          const formattedEndTime = responseItem.actualEndTime
            ? formatTime(responseItem.actualEndTime)
            : '';

          const newTimeEntries = deepCloneJson(timeEntries);
          newTimeEntries[timeEntriesIndex] = ContextTimeEntry.createFrom(
            timeEntry
          )
            .setStartTime(formattedStartTime)
            .setFinishTime(formattedEndTime)
            .setTimeEntryId(responseItem.id);

          setTimeEntries(newTimeEntries);
          setSummaryErrors({});
          setShowEditShiftHours(false);
        }
      },
      handleServerValidationErrors
    );
  };

  const getCombinedErrors = () => {
    var existingErrors =
      Object.keys(errors).length > 0 ? errors : summaryErrors;

    const combinedErrors = { ...existingErrors };

    if (clashingProperty == 'startAndEndTime') {
      combinedErrors['shift-start-time'] = {
        message: (
          <div>
            <p>
              Your start and finish times must not overlap with another time
              period
            </p>
            {formatTimeClashes(clashingTimes)}
          </div>
        ),
      };
      combinedErrors['shift-finish-time'] = {
        message: '',
      };
    }

    if (clashingProperty == 'startTime') {
      combinedErrors['shift-start-time'] = {
        message: (
          <div>
            <p>Your start time must not overlap with another period</p>
            {formatTimeClashes(clashingTimes)}
          </div>
        ),
      };
    }
    console.log(clashingProperty);
    if (clashingProperty == 'endTime') {
      combinedErrors['shift-finish-time'] = {
        message: (
          <div>
            <p>Your end time must not overlap with another period</p>
            {formatTimeClashes(clashingTimes)}
          </div>
        ),
      };
    }

    console.log('here');
    console.log(combinedErrors);
    return combinedErrors;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <StartFinishTimeInput
          name={inputName}
          errors={getCombinedErrors()}
          register={register}
          formState={formState}
          startTimeValue={timeEntry.startTime}
          finishTimeValue={timeEntry.finishTime}
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
