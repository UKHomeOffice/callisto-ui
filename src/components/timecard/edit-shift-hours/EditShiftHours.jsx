import { PropTypes } from 'prop-types';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TimecardContext } from '../../../pages/timecard/Timecard';
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

  const inputName = 'hours';
  const { summaryErrors, setSummaryErrors, timecardData, setTimecardData } =
    useContext(TimecardContext);

  useEffect(() => {
    const newErrors = { ...summaryErrors, ...errors };
    if (!errors[`${inputName}-start-time`]) {
      delete newErrors[`${inputName}-start-time`];
    }
    setSummaryErrors(newErrors);
  }, [errors]);

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          setTimecardData({
            ...timecardData,
            startTime: data['hours-start-time'],
            endTime: data['hours-finish-time'],
          });
          setShowEditShiftHours(false);
        })}
      >
        <StartFinishTimeInput
          name={inputName}
          errors={errors}
          register={register}
          formState={formState}
          startTimeValue={timecardData.startTime ? timecardData.startTime : ''}
          finishTimeValue={timecardData.endTime ? timecardData.endTime : ''}
        />
        <div className="govuk-button-group">
          <button className="govuk-button" type="submit">
            Save
          </button>
          <button className="govuk-button govuk-button--secondary">
            Cancel
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
