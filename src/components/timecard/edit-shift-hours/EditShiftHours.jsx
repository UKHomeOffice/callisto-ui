import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  createTimeEntry,
  updateTimeEntry,
} from '../../../api/services/timecardService';
import { useTimecardContext } from '../../../context/TimecardContext';
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
import { useApplicationContext } from '../../../context/ApplicationContext';

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
  const { setServiceError } = useApplicationContext();
  const { timeEntries, setTimeEntries, timecardDate, setSummaryErrors } =
    useTimecardContext();

  const handleError = (errorFields) => {
    setSummaryErrors(errorFields);
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
      ownerId: 1,
      timePeriodTypeId: timeEntry.timePeriodTypeId,
      actualStartTime: actualStartDateTime,
      actualEndTime: actualEndDateTime,
    };

    try {
      const params = new UrlSearchParamBuilder()
        .setTenantId('00000000-0000-0000-0000-000000000000')
        .getUrlSearchParams();

      const response = !timeEntry.timeEntryId
        ? await createTimeEntry(timecardPayload, params)
        : await updateTimeEntry(timeEntry.timeEntryId, timecardPayload, params);

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

        setServiceError(false);
        setTimeEntries(newTimeEntries);
        setSummaryErrors({});
        setShowEditShiftHours(false);
      } else {
        throw new Error('No data returned - something went wrong');
      }
    } catch (error) {
      /* TODO: Error handling when server raises error, similar to:
      setSummaryErrors(error); */
      console.error(error);
      setServiceError(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <StartFinishTimeInput
          name={inputName}
          errors={errors}
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
