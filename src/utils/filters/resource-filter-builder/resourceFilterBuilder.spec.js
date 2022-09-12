import dayjs from 'dayjs';
import { formatDateTimeISO } from '../../time-entry-utils/timeEntryUtils';
import { filterOnOrAfterDate, filterBeforeDate } from './resourceFilterBuilder';

const date = '2022-10-29';
const dateTime = date + ' 19:18:09';
const resourceDateProperty = 'startTime';

describe('resourceFilterBuilder', () => {
  describe('filterOnOrAfterDate', () => {
    it('should create a filter specifying that the resource property is greater or equal to midnight of the date', () => {
      expect(filterOnOrAfterDate(resourceDateProperty, dateTime)).toEqual(
        resourceDateProperty +
          ">='" +
          formatDateTimeISO(dayjs(date + ' 00:00:00')) +
          "'"
      );
    });
  });

  describe('filterBeforeDate', () => {
    it('should create a filter specifying that the resource property is less than or equal to the end of the date', () => {
      expect(filterBeforeDate(resourceDateProperty, dateTime)).toEqual(
        resourceDateProperty +
          "<='" +
          formatDateTimeISO(dayjs(date).subtract(1, 'minute')) +
          "'"
      );
    });
  });
});
