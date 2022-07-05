import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Radios from '../../common/form/radios/Radios';

const AddShift = () => {
  const shiftTypes = [
    'Shift',
    'Scheduled rest day',
    'Non-working day',
    'On call',
    'Absence',
    'Training',
    'Overtime',
  ];

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onChange',
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          navigate('/next-page');
        })}
        style={{
          border: '1px solid #b1b4b6',
          padding: '15px',
        }}
      >
        <Radios
          name="shiftType"
          heading="Add a new time period"
          headingSize="s"
          options={shiftTypes}
          errors={errors}
          {...register('shiftType', {
            required: {
              value: true,
              message: 'Select a shift type',
            },
          })}
        />

        <button
          className="govuk-button"
          data-module="govuk-button"
          type="submit"
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default AddShift;
