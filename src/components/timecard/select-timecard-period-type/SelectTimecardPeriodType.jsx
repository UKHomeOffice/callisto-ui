import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TimecardContext } from '../../../pages/timecard/Timecard';

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

  const radioName = 'timePeriod';
  const { summaryErrors, setSummaryErrors } = useContext(TimecardContext);

  useEffect(() => {
    const newErrors = { ...summaryErrors, ...errors };
    if (Object.keys(errors).length === 0) {
      delete newErrors[radioName];
    }
    setSummaryErrors(newErrors);
  }, [errors]);

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
          name={radioName}
          heading="Add a new time period"
          headingSize="s"
          options={timePeriods}
          errors={errors}
          {...register(radioName, {
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

SelectTimecardPeriodType.propTypes = {
  setTimecardEntryExists: PropTypes.func,
};
