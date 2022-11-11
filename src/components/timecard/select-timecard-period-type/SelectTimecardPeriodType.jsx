import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useTimecardContext } from '../../../context/TimecardContext';

import Radios from '../../common/form/radios/Radios';
import { useApplicationContext } from '../../../context/ApplicationContext';
import { ContextTimeEntry } from '../../../utils/time-entry-utils/ContextTimeEntry';
import { addTimePeriodHeading } from '../../../utils/time-entry-utils/timeEntryUtils';
import { focusErrors } from '../../../utils/common-utils/common-utils';

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

  const {
    timeEntries,
    setTimeEntries,
    summaryErrors,
    setSummaryErrors,
    setNewTimeEntry,
  } = useTimecardContext();

  const handleError = (errorFields) => {
    setSummaryErrors(errorFields);
  };

  useEffect(() => {
    focusErrors(document.getElementById('summary-error-0-message'));
  }, [summaryErrors]);

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
          setNewTimeEntry(false);
          setSummaryErrors({});
        }, handleError)}
      >
        <Radios
          name={radioName}
          heading={addTimePeriodHeading}
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
