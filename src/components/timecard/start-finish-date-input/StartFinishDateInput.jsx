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
        dayValue={
          startEntryExists
            ? formatJustDay(startTimeValue)
            : formatJustDay(timecardDate)
        }
        monthValue={
          startEntryExists
            ? formatJustMonth(startTimeValue)
            : formatJustMonth(timecardDate)
        }
        yearValue={
          startEntryExists
            ? formatJustYear(startTimeValue)
            : formatJustYear(timecardDate)
        }
      />
      <DateInput
        name={`finish${name}`}
        heading="Finish date"
        headingSize="m"
        hint="For example, 24 7 2021"
        errors={errors}
        register={register}
        formState={formState}
        dayValue={
          finishEntryExists
            ? formatJustDay(finishTimeValue)
            : formatJustDay(calculateEndDate())
        }
        monthValue={
          finishEntryExists
            ? formatJustMonth(finishTimeValue)
            : formatJustMonth(calculateEndDate())
        }
        yearValue={
          finishEntryExists
            ? formatJustYear(finishTimeValue)
            : formatJustYear(calculateEndDate())
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
};
