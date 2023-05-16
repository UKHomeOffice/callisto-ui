import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(isSameOrBefore);

export const addTimePeriodHeading = 'Add time period';

export const getSingleTimeEntryResponseItem = (timeEntryResponseData) => {
  if (timeEntryResponseData.items && timeEntryResponseData.items.length > 0)
    return timeEntryResponseData.items[0];
  throw new Error(
    'The time entry response data did not contain at least one time entry.'
  );
};

export const formatTime = (time) => {
  return dayjs(time).format('HH:mm');
};

export const formatDate = (dateTime) => {
  return dayjs(dateTime).format('YYYY-MM-DD');
};

export const formatDateNoYear = (dateTime) => {
  return dayjs(dateTime).format('D MMMM');
};

export const formatDateTimeISO = (dateTime) => {
  return dayjs(dateTime).format('YYYY-MM-DDTHH:mm:ssZ');
};

export const formatLongDate = (dateTime) => {
  return dayjs(dateTime).format('D MMMM YYYY');
};

export const formatJustDay = (dateTime) => {
  return dayjs(dateTime).format('DD');
};

export const formatJustMonth = (dateTime) => {
  return dayjs(dateTime).format('MM');
};

export const formatJustYear = (dateTime) => {
  return dayjs(dateTime).format('YYYY');
};

export const formatToHoursAndMinutes = (minutesInput) => {
  if (minutesInput > 0) {
    const hours = Math.trunc(minutesInput / 60);
    let minutes = minutesInput % 60;
    minutes = minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  return '00:00';
};

export const removeTimecardEntry = (
  timeEntries,
  setTimeEntries,
  timeEntriesIndex
) => {
  if (timeEntriesIndex === 0) {
    setTimeEntries([...timeEntries.slice(1)]);
  } else {
    setTimeEntries([
      ...timeEntries.slice(0, timeEntriesIndex),
      ...timeEntries.slice(timeEntriesIndex + 1),
    ]);
  }
};

export const getTimePeriodTypesMap = (timePeriodTypes) => {
  return timePeriodTypes.reduce(
    (acc, type) => ({ ...acc, [type.id]: type.name }),
    {}
  );
};

export const isFinishTimeOnNextDay = (startTimeValue, finishTimeValue) => {
  if (startTimeValue && finishTimeValue) {
    return dayjs(formatDate(dayjs()) + finishTimeValue).isSameOrBefore(
      dayjs(formatDate(dayjs()) + startTimeValue)
    );
  }
  return false;
};

export const checkDateFormat = (
  fieldType,
  formData,
  validatedData,
  newErrors
) => {
  const day = `${fieldType}Date-day`;
  const month = `${fieldType}Date-month`;
  const year = `${fieldType}Date-year`;
  const priority = fieldType === 'start' ? 3 : 4;

  if (!formData[day].match(/^([1-9]|0[1-9]|[12]\d|3[01])$/)) {
    if (!newErrors.some((error) => error.key === `empty${fieldType}Day`)) {
      newErrors.push({
        key: `${fieldType}DayInvalid`,
        inputName: day,
        message: `Enter a valid ${fieldType} day`,
        errorPriority: priority,
      });
    }
    validatedData.isValid = false;
  }

  if (!formData[month].match(/^([1-9]|0[1-9]|1[012])$/)) {
    if (!newErrors.some((error) => error.key === `empty${fieldType}Month`)) {
      newErrors.push({
        key: `${fieldType}MonthInvalid`,
        inputName: month,
        message: `Enter a valid ${fieldType} month`,
        errorPriority: priority,
      });
    }
    validatedData.isValid = false;
  }

  if (!formData[year].match(/^\d{4}$/)) {
    if (!newErrors.some((error) => error.key === `empty${fieldType}Year`)) {
      newErrors.push({
        key: `${fieldType}YearInvalid`,
        inputName: year,
        message: `Enter a valid ${fieldType} year`,
        errorPriority: priority,
      });
    }
    validatedData.isValid = false;
  }
};

export const validateFormDates = (
  fieldType,
  formData,
  validatedData,
  newErrors
) => {
  const day = `${fieldType}Date-day`;
  const month = `${fieldType}Date-month`;
  const year = `${fieldType}Date-year`;
  const priority = fieldType === 'start' ? 3 : 4;
  let datesValid = true;

  if (!formData[day]) {
    validatedData.isValid = false;
    datesValid = false;
    newErrors.push({
      key: `${fieldType}DayEmpty`,
      inputName: day,
      message: `Enter a ${fieldType} day`,
      errorPriority: priority,
    });
  }

  if (!formData[month]) {
    validatedData.isValid = false;
    datesValid = false;
    newErrors.push({
      key: `${fieldType}MonthEmpty`,
      inputName: month,
      message: `Enter a ${fieldType} month`,
      errorPriority: priority,
    });
  }
  if (!formData[year]) {
    validatedData.isValid = false;
    datesValid = false;
    newErrors.push({
      key: `${fieldType}YearEmpty`,
      inputName: year,
      message: `Enter a ${fieldType} year`,
      errorPriority: priority,
    });
  }
  return datesValid;
};

export const isTimeValid = (time, timeType) => {
  if (time.length < 3 && time.length > 0) {
    const hhTimeRegEx = /^(\d|[01]\d|2[0-3])$/;
    return hhTimeRegEx.test(time);
  } else if (time.length > 3 && time.length < 6) {
    const hhmmTimeRegEx = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    return hhmmTimeRegEx.test(time);
  } else if (time.length == 0 && timeType === 'finish time') {
    return true;
  } else {
    return false;
  }
};
