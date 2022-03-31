import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import DateInput from '../components/common/form/date-input/DateInput';
import ErrorSummary from '../components/common/form/error-summary/ErrorSummary';
import Input from '../components/common/form/input/Input';
import Radios from '../components/common/form/radios/Radios';

const FormsExample = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onSubmit',
  });

  return (
    <>
      <h1 className="govuk-heading-xl">Forms example page</h1>
      {errors && Object.keys(errors).length !== 0 && (
        <ErrorSummary errors={errors} />
      )}

      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          navigate('/');
        })}
      >
        <Input
          name="name"
          heading="What is your name?"
          headingSize="m"
          inputWidth="20"
          hint="eg. Joanna"
          errors={errors}
          {...register('name', {
            required: {
              value: true,
              message: 'Enter your name',
            },
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
            maxLength: {
              value: 40,
              message: 'Name must not exceed 40 characters',
            },
          })}
        />

        <Radios
          name="whereDoYouLive"
          heading="Where do you live?"
          headingSize="m"
          options={['England', 'Ireland', 'Scotland', 'Wales']}
          hint="eg. England"
          errors={errors}
          {...register('whereDoYouLive', {
            required: {
              value: true,
              message: 'Select a location',
            },
          })}
        />

        <DateInput
          name="dateOfBirth"
          heading="What is your date of birth?"
          headingSize="m"
          hint="eg. 01/01/1990"
          errors={errors}
          register={register}
          formState={formState}
        />

        <button
          className="govuk-button"
          data-module="govuk-button"
          type="submit"
        >
          Save and continue
        </button>
      </form>
    </>
  );
};

export default FormsExample;
