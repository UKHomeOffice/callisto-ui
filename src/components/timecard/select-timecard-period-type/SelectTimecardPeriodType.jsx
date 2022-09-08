import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useTimecardContext } from '../../../context/TimecardContext';

import Radios from '../../common/form/radios/Radios';
import { getTimePeriodTypes } from '../../../api/services/timecardService';
import { useEffect, useState } from 'react';

const SelectTimecardPeriodType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
  });

  const [timePeriods, setTimePeriods] = useState([]);
  const getTimePeriodTypeData = async () => {
    try {
      const params = new URLSearchParams([
        ['tenantId', '00000000-0000-0000-0000-000000000000'],
      ]);
      const response = await getTimePeriodTypes(params);
      if (response?.data?.items) {
        setTimePeriods(response.data.items.map((item) => item.name));
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTimePeriodTypeData();
  }, []);

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
          const newTimeEntries = timeEntries;
          newTimeEntries.push({
            timePeriodType: data[radioName],
            timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          });
          setTimeEntries(newTimeEntries);
          setSummaryErrors({});
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
