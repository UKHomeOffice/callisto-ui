import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useTimecardContext } from '../../../context/TimecardContext';

import Radios from '../../common/form/radios/Radios';

const SelectTimecardPeriodType = () => {

  const client = Axios.create({
    baseURL: 'http://localhost:9090',
    responseType: 'arraybuffer',
    responseEncoding: 'binary',
  });

  client.get('/resources/time-period-type?tenantId=00000000-0000-0000-0000-000000000000', { 
    mode: 'no-cors',   
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      pageable: {
        "page": '0',
        "size": '10'
      }
    } 
  }).then(response => console.log(response))
    .then(data => console.log(data));

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

  const { timecardData, setTimecardData, setSummaryErrors } =
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
