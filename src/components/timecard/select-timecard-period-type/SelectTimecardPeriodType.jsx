import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Radios from '../../common/form/radios/Radios';

const SelectTimecardPeriodType = ({ setTimecardEntryExists }) => {
  const timePeriods = [
    'Shift',
    'Scheduled rest day',
    'Non-working day',
    'On call',
    'Absence',
    'Training',
    'Overtime',
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onSubmit',
  });

  return (
    <>
      <form
        className="select-timecard-period-type"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          setTimecardEntryExists(true);
        })}
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

export default SelectTimecardPeriodType;

SelectTimecardPeriodType.displayName = 'SelectTimecardPeriodType';
SelectTimecardPeriodType.propTypes = {
  setTimecardEntryExists: PropTypes.func,
};
