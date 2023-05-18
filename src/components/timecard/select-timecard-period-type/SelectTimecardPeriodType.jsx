import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Radios from '../../common/form/radios/Radios';
import { ContextTimeEntry } from '../../../utils/time-entry-utils/ContextTimeEntry';
import { addTimePeriodHeading } from '../../../utils/time-entry-utils/timeEntryUtils';
import { focusErrors } from '../../../utils/common-utils/common-utils';

const SelectTimecardPeriodType = ({
  summaryErrors,
  setSummaryErrors,
  timePeriodTypes,
  timeEntries,
  setTimeEntries,
  setAddNewTimeEntry,
}) => {
  const { register, handleSubmit } = useForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
  });

  const timePeriodTypeNames = timePeriodTypes.map((timePeriodType) => {
    return timePeriodType.name;
  });

  const radioName = 'timePeriod';

  const handleError = (errorFields) => {
    setSummaryErrors(errorFields);
  };

  useEffect(() => {
    focusErrors(document.getElementById('summary-error-0-message'));
  }, [summaryErrors]);

  const onSubmit = (data) => {
    const validatedData = validateSubmittedData(data);
    if (validatedData.isValid) {
      const timePeriodTypeId = timePeriodTypes.find(
        (timePeriodType) => timePeriodType.name === data[radioName]
      ).id;

      setTimeEntries([
        ...timeEntries,
        ContextTimeEntry.create().setTimePeriodTypeId(timePeriodTypeId),
      ]);
      setAddNewTimeEntry(false);
      setSummaryErrors([]);
    } else {
      handleError(validatedData.errors);
    }
  };

  const validateSubmittedData = (formData) => {
    let isValid = true;
    let newErrors = [];

    if (!formData.timePeriod) {
      isValid = false;
      newErrors.push({
        key: 'radioName',
        inputName: 'timePeriod',
        message: 'You must select a time period',
        errorPriority: 1,
      });
    }

    const validatedData = {
      isValid: isValid,
      errors: newErrors,
    };

    return validatedData;
  };

  // BEGIN-NOSCAN
  return (
    <>
      <form
        className="grey-border"
        onSubmit={handleSubmit(onSubmit, handleError)}
      >
        <Radios
          name={radioName}
          heading={addTimePeriodHeading}
          headingSize="s"
          options={timePeriodTypeNames}
          errors={summaryErrors}
          {...register(radioName, {})}
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
  // END-NOSCAN
};

export default SelectTimecardPeriodType;

SelectTimecardPeriodType.propTypes = {
  summaryErrors: PropTypes.array,
  setSummaryErrors: PropTypes.func,
  timePeriodTypes: PropTypes.array,
  timeEntries: PropTypes.array,
  setTimeEntries: PropTypes.func,
  setAddNewTimeEntry: PropTypes.func,
};
