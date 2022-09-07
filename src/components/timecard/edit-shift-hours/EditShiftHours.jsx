import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import { saveTimeEntry } from '../../../api/services/timecardService';
import { useTimecardContext } from '../../../context/TimecardContext';
import StartFinishTimeInput from '../start-finish-time-input/StartFinishTimeInput';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const EditShiftHours = ({ setShowEditShiftHours, timeEntry, index }) => {
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
  const { timeEntries, setTimeEntries } = useTimecardContext();
  const { setSummaryErrors } = useTimecardContext();

  const handleError = (errorFields) => {
    setSummaryErrors(errorFields);
  };

  const onSubmit = async (formData) => {
    dayjs.extend(utc);

    const actualStartDate = dayjs(timeEntry.startDate).format('YYYY-MM-DD');
    const startTime = formData[`${inputName}-start-time`];
    const actualStartDateTime = dayjs(
      actualStartDate + ' ' + startTime
    ).format();

    const endTime = formData[`${inputName}-finish-time`] || null;
    let actualEndDateTime;
    if (endTime) {
      actualEndDateTime = dayjs(actualStartDate + ' ' + endTime).format();
    }

    const timecardPayload = {
      ownerId: 1,
      timePeriodTypeId: timeEntry.timePeriodTypeId,
      actualStartTime: actualStartDateTime,
      actualEndTime: actualEndDateTime,
    };

    try {
      const params = new URLSearchParams([
        ['tenantId', '00000000-0000-0000-0000-000000000000'],
      ]);

      const response = await saveTimeEntry(timecardPayload, params);

      if (response?.data?.items && response?.data?.items.length > 0) {
        const existingTimeEntries = timeEntries;
        existingTimeEntries[index] = {
          ...timeEntry,
          startTime: formData[`${inputName}-start-time`],
          finishTime: formData[`${inputName}-finish-time`] || '',
          id: response.data.items[0].id,
        };
        setTimeEntries(existingTimeEntries);
        setSummaryErrors({});
        setShowEditShiftHours(false);
      } else {
        //no items returned, something went wrong
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
  index: PropTypes.number,
  setShowEditShiftHours: PropTypes.func,
};
