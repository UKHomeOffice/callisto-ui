import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTimecardContext } from '../../../context/TimecardContext';

import Radios from '../../common/form/radios/Radios';

const SelectTimecardPeriodType = () => {
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

  const { timecardData, setTimecardData, summaryErrors, setSummaryErrors } =
    useTimecardContext();

  const handleError = (errorFields) => {
    setSummaryErrors(errorFields);
  };

  return (
    <>
      <form
        className="select-timecard-period-type"
        onSubmit={handleSubmit((data) => {
          setTimecardData({ ...timecardData, timePeriodType: data[radioName] });
        }, handleError)}
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
