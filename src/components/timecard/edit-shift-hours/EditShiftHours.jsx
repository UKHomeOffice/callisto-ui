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

  const { summaryErrors, setSummaryErrors } = useContext(TimecardContext);

  useEffect(() => {
    const newErrors = { ...summaryErrors, ...errors };
    if (!errors['hours-start-time']) {
      delete newErrors['hours-start-time'];
    }
    setSummaryErrors(newErrors);
  }, [errors]);

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          setShowEditShiftHours(false);
        })}
      >
        <StartFinishTimeInput
          name={'hours'}
          errors={errors}
          register={register}
          formState={formState}
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
