import { useForm } from 'react-hook-form';
import StartFinishTimeInput from '../start-finish-time-input/StartFinishTimeInput';

const EditShiftHours = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm({
    reValidateMode: 'onSubmit',
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
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
          <button
            className="govuk-button govuk-button--secondary"
            type="submit"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditShiftHours;
