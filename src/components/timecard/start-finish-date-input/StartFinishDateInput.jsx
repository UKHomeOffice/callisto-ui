import PropTypes from 'prop-types';
import DateInput from '../../common/form/date-input/DateInput';
import {
  formatJustDay,
  formatJustMonth,
  formatJustYear,
  formatDate,
} from '../../../utils/time-entry-utils/timeEntryUtils';
import dayjs from 'dayjs';

const StartFinishDateInput = ({
  name,
  errors,
  startTimeValue,
  finishTimeValue,
  startEntryExists,
  finishEntryExists,
  timecardDate,
  register,
  formState,
  finishNextDay,
  getFormValues,
  setStartDate,
  setEndDate,
}) => {
  const calculateEndDate = () => {
    return startEntryExists
      ? formatDate(getFinishTimeDate(startTimeValue))
      : formatDate(getFinishTimeDate(timecardDate));
  };

  const getFinishTimeDate = (actualStartDate) => {
    if (finishNextDay) {
      return formatDate(dayjs(actualStartDate).add(1, 'day'));
    } else {
      return actualStartDate;
    }
  };

  return (
    <div>
      <DateInput
        name={`start${name}`}
        heading="Start date"
        headingSize="m"
        hint="For example, 23 7 2021"
        errors={errors}
        register={register}
        formState={formState}
        getFormValues={getFormValues}
        setDate={setStartDate}
        setEndDate={setEndDate}
        dayValue={formatJustDay(startTimeValue)}
        monthValue={formatJustMonth(startTimeValue)}
        yearValue={formatJustYear(startTimeValue)}
      />
      <DateInput
        name={`finish${name}`}
        heading="Finish date"
        headingSize="m"
        hint="For example, 24 7 2021"
        errors={errors}
        register={register}
        formState={formState}
        getFormValues={getFormValues}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        dayValue={
          finishNextDay
            ? formatJustDay(calculateEndDate())
            : formatJustDay(finishTimeValue)
        }
        monthValue={
          finishNextDay
            ? formatJustMonth(calculateEndDate())
            : formatJustMonth(finishTimeValue)
        }
        yearValue={
          finishNextDay
            ? formatJustYear(calculateEndDate())
            : formatJustYear(finishTimeValue)
        }
      />
    </div>
  );
};

export default StartFinishDateInput;

StartFinishDateInput.propTypes = {
  name: PropTypes.string,
  errors: PropTypes.any.isRequired,
  startTimeValue: PropTypes.string,
  finishTimeValue: PropTypes.string,
  startEntryExists: PropTypes.bool,
  finishEntryExists: PropTypes.bool,
  timecardDate: PropTypes.string,
  register: PropTypes.any.isRequired,
  formState: PropTypes.any,
  finishNextDay: PropTypes.bool,
  getFormValues: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
};
