import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import { saveTimeEntry } from '../../../api/services/timecardService';
import { useTimecardContext } from '../../../context/TimecardContext';
import StartFinishTimeInput from '../start-finish-time-input/StartFinishTimeInput';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { UrlSearchParamBuilder } from '../../../utils/api-utils/UrlSearchParamBuilder';
import { deepClone } from '../../../utils/common-utils/common-utils';

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
  const { timeEntries, setTimeEntries, timecardDate, setSummaryErrors } =
    useTimecardContext();

  const handleError = (errorFields) => {
    setSummaryErrors(errorFields);
  };

  const onSubmit = async (formData) => {
    dayjs.extend(utc);

    const actualStartDate = dayjs(timecardDate).format('YYYY-MM-DD');
    const startTime = formData[`${inputName}-start-time`];
    const actualStartDateTime = dayjs(
      actualStartDate + ' ' + startTime
    ).format();

    const endTime = formData[`${inputName}-finish-time`] || null;
    let actualEndDateTime = endTime
      ? dayjs(actualStartDate + ' ' + endTime).format()
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

      const response = await saveTimeEntry(timecardPayload, params);

      if (response?.data?.items?.length > 0) {
        const newTimeEntries = deepClone(timeEntries);
        newTimeEntries[timeEntriesIndex] = {
          ...timeEntry,
          startTime: formData[`${inputName}-start-time`],
          finishTime: formData[`${inputName}-finish-time`] || '',
          timeEntryId: response.data.items[0].id,
        };

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
