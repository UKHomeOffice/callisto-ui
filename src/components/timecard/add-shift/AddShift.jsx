import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Radios from '../../common/form/radios/Radios';

const AddTimePeriod = ({ register, handleSubmit, errors }) => {
  const timePeriods = [
    'Shift',
    'Scheduled rest day',
    'Non-working day',
    'On call',
    'Absence',
    'Training',
    'Overtime',
  ];

  const navigate = useNavigate();

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
          name="timePeriod"
          heading="Add a new time period"
          headingSize="s"
          options={timePeriods}
          errors={errors}
          {...register('timePeriod', {
            required: {
              value: true,
              message: 'You must select a time period',
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

export default AddTimePeriod;

AddTimePeriod.displayName = 'AddTimePeriod';
AddTimePeriod.propTypes = {
  register: PropTypes.any.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.any,
};
