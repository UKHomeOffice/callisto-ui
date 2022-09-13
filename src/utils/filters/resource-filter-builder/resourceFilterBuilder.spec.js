import dayjs from 'dayjs';
import { formatDate } from '../../time-entry-utils/timeEntryUtils';
import { filterOnOrAfterDate, filterBeforeDate } from './resourceFilterBuilder';

const date = '2022-10-29';
const dateTime = date + ' 19:18:09';
const resourceDateProperty = 'startTime';

describe('resourceFilterBuilder', () => {
  it('should create a filter specifying that the resource property is greater or equal to midnight of the date', () => {
    expect(filterOnOrAfterDate(resourceDateProperty, dateTime)).toEqual(
      resourceDateProperty + ">='" + date + "T00:00:00+00:00'"
    );
  });

  it('should create a filter specifying that the resource property is less than or equal to the end of the date', () => {
    expect(filterBeforeDate(resourceDateProperty, dateTime)).toEqual(
      resourceDateProperty +
        "<='" +
        formatDate(dayjs(date).subtract(1, 'minute')) +
        "T23:59:00+00:00'"
    );
  });
});
