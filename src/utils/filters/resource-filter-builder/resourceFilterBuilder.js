import dayjs from 'dayjs';

export const filterOnOrAfterDate = (resourceDateProperty, date) => {
  let dateMidnight = dayjs(date)
    .hour(0)
    .minute(0)
    .second(0)
    .format('YYYY-MM-DDTHH:mm:ssZ');
  return resourceDateProperty + ">='" + dateMidnight + "'";
};

export const filterBeforeDate = (resourceDateProperty, date) => {
  let beforeDate = dayjs(date)
    .hour(0)
    .minute(0)
    .second(0)
    .subtract(1, 'minute')
    .format('YYYY-MM-DDTHH:mm:ssZ');
  return resourceDateProperty + "<='" + beforeDate + "'";
};
