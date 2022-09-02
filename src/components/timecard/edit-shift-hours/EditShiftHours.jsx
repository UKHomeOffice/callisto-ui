import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  saveTimeEntry,
  updateTimeEntry,
} from '../../../api/services/timecardService';
import { useTimecardContext } from '../../../context/TimecardContext';
import StartFinishTimeInput from '../start-finish-time-input/StartFinishTimeInput';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TimeEntryQueryParams } from '../../../utils/timeEntryUtils/TimeEntryQueryParams';
import { formatDate } from '../../../utils/timeEntryUtils/timeEntryUtils';

const EditShiftHours = ({ setShowEditShiftHours }) => {
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
  const { timecardData, setTimecardData } = useTimecardContext();
  const { setSummaryErrors } = useTimecardContext();

  const handleError = (errorFields) => {
    setSummaryErrors(errorFields);
  };

  const onSubmit = async (formData) => {
    dayjs.extend(utc);

    const actualStartDate = formatDate(timecardData.startDate);
    const actualStartTime = formData[`${inputName}-start-time`];
    const actualStartDateTime = dayjs(
      actualStartDate + ' ' + actualStartTime
    ).format();

    const endTime = formData[`${inputName}-finish-time`] || null;
    let actualEndDateTime;
    if (endTime) {
      actualEndDateTime = dayjs(actualStartDate + ' ' + endTime).format();
    }

    const timecardPayload = {
      ownerId: 1,
      timePeriodTypeId: timecardData.timePeriodTypeId,
      actualStartTime: actualStartDateTime,
      actualEndTime: actualEndDateTime,
    };

    try {
      const params = new TimeEntryQueryParams()
        .setTenantId('00000000-0000-0000-0000-000000000000')
        .getUrlSearchParams();

      const response = !timecardData.timeEntryId
        ? await saveTimeEntry(timecardPayload, params)
        : await updateTimeEntry(
            timecardData.timeEntryId,
            timecardPayload,
            params
          );

      if (response && response.data) {
        const timecardResponseData = response.data;

        if (
          timecardResponseData.items &&
          timecardResponseData.items.length > 0
        ) {
          setTimecardData({
            ...timecardData,
            startTime: formData[`${inputName}-start-time`],
            finishTime: formData[`${inputName}-finish-time`] || '',
            timeEntryId: timecardResponseData.items[0].id,
          });
          setSummaryErrors({});
          setShowEditShiftHours(false);
        } else {
          //no items returned, something went wrong
        }
      }
    } catch (error) {
      /* TODO: Error handling when server raises error, similar to:
      setSummaryErrors(error); */
      console.log(error);
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
          startTimeValue={timecardData.startTime}
          finishTimeValue={timecardData.finishTime}
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
  setShowEditShiftHours: PropTypes.func,
};
