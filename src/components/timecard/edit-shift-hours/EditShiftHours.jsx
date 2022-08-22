import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import { saveTimecard } from '../../../api/services/timecardService';
import { useTimecardContext } from '../../../context/TimecardContext';
import StartFinishTimeInput from '../start-finish-time-input/StartFinishTimeInput';

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

  const onSubmit = async (data) => {
    console.log('onSubmit');

    setSummaryErrors({});

    const timecardPayload = {
      startTime: data[`${inputName}-start-time`],
      finishTime: data[`${inputName}-finish-time`] || undefined,
      startDate: data['startDate'],
      timePeriodType: 1, // TODO: Ref data?
    };

    try {
      const response = await saveTimecard(timecardPayload);
      if (response && response.data) {
        console.log('Response: ' + response.data);
        /* TODO: Set state from GET, or as below? */
        setTimecardData(timecardPayload);
        setShowEditShiftHours(false);
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
        </div>
      </form>
    </div>
  );
};

export default EditShiftHours;
EditShiftHours.propTypes = {
  setShowEditShiftHours: PropTypes.func,
};
