import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import { saveTimeEntry } from '../../../api/services/timecardService';
import { useTimecardContext } from '../../../context/TimecardContext';
import StartFinishTimeInput from '../start-finish-time-input/StartFinishTimeInput';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const EditShiftHours = ({ setShowEditShiftHours }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm({
    reValidateMode: 'onSubmit',
  });

  const inputName = 'shift';
  const { timecardData, setTimecardData } = useTimecardContext();
  const { setSummaryErrors } = useTimecardContext();

  const handleError = (errorFields) => {
    setSummaryErrors(errorFields);
  };

  const onSubmit = async (formData) => {
    dayjs.extend(utc);

    const actualStartDate = dayjs(formData['startDate']).format('YYYY-MM-DD');
    const startTime = formData[`${inputName}-start-time`];
    const actualStartDateTime = dayjs(
      actualStartDate + ' ' + startTime
    ).format();

    const endTime = formData[`${inputName}-finish-time`] || null;
    let actualEndDateTime;
    if (endTime) {
      actualEndDateTime = dayjs(actualStartDate + ' ' + endTime).format();
    }
    const tempNow = dayjs(new Date()).format();
    const timecardPayload = {
      ownerId: 1,
      timePeriodTypeId: formData['timePeriodTypeId'],
      actualStartTime: actualStartDateTime,
      actualEndTime: actualEndDateTime,
      createdAt: tempNow,
      updatedAt: tempNow,
    };

    try {
      const params = new URLSearchParams([
        ['tenantId', '00000000-0000-0000-0000-000000000000'],
      ]);

      const response = await saveTimeEntry(timecardPayload, params);

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
            id: timecardResponseData.items[0].id,
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
          <input
            type="hidden"
            {...register('startDate')}
            defaultValue={timecardData.startDate}
          />
          <input
            type="hidden"
            {...register('timePeriodTypeId')}
            defaultValue={timecardData.timePeriodTypeId}
          />
        </div>
      </form>
    </div>
  );
};

export default EditShiftHours;
EditShiftHours.propTypes = {
  setShowEditShiftHours: PropTypes.func,
};
