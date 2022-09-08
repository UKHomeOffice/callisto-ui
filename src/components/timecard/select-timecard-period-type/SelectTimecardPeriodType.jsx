import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useTimecardContext } from '../../../context/TimecardContext';

import Radios from '../../common/form/radios/Radios';
import { useEffect, useState } from 'react';
import { useApplicationContext } from '../../../context/ApplicationContext';

const SelectTimecardPeriodType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
  });

  const { timePeriodTypes } = useApplicationContext();

  useEffect(() => {}, []);

  const timePeriodTypeNames = timePeriodTypes.map((timePeriodType) => {
    return timePeriodType.name;
  });

  const radioName = 'timePeriod';

  const { timeEntries, setTimeEntries, setSummaryErrors } =
    useTimecardContext();

  const handleError = (errorFields) => {
    setSummaryErrors(errorFields);
  };

  return (
    <>
      <form
        className="select-timecard-period-type"
        onSubmit={handleSubmit((data) => {
          setTimeEntries([
            ...timeEntries,
            {
              timePeriodType: data[radioName],
              timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
            },
          ]);
          setSummaryErrors({});
        }, handleError)}
      >
        <Radios
          name={radioName}
          heading="Add a new time period"
          headingSize="s"
          options={timePeriodTypeNames}
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
