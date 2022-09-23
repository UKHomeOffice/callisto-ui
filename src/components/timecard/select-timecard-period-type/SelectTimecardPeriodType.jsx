import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useTimecardContext } from '../../../context/TimecardContext';

import Radios from '../../common/form/radios/Radios';
import { useApplicationContext } from '../../../context/ApplicationContext';
import { ContextTimeEntry } from '../../../utils/time-entry-utils/ContextTimeEntry';

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
        className="grey-border"
        onSubmit={handleSubmit((data) => {
          const timePeriodTypeId = timePeriodTypes.find(
            (timePeriodType) => timePeriodType.name === data[radioName]
          ).id;
          setTimeEntries([
            ...timeEntries,
            ContextTimeEntry.create().setTimePeriodTypeId(timePeriodTypeId),
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
