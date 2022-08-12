import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

  const inputName = 'hours';
  const { summaryErrors, setSummaryErrors, timecardData, setTimecardData } =
    useTimecardContext();

  useEffect(() => {
    updateErrors();  
  }, [errors]);

  const updateErrors = () => {
    const newErrors = { ...summaryErrors, ...errors };
    if (!errors[`${inputName}-start-time`]) {
      delete newErrors[`${inputName}-start-time`];
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          setTimecardData({
            ...timecardData,
            startTime: data[`${inputName}-start-time`],
            finishTime: data[`${inputName}-finish-time`],
          });
          setShowEditShiftHours(false);
        })}
      >
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
