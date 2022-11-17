import dayjs from 'dayjs';
import { buildTimeEntriesFilter } from './timeEntryFilterBuilder';
import { timeEntryFilter } from '../../../../mocks/mockData';

describe('timeEntryFilterBuilder', () => {
  describe('buildTimeEntriesFilter', () => {
    it('should return the timecard filter containing start and end time', () => {
      const date = '20220-10-29';
      const dateTime = dayjs(date + ' 19:18:;09');
      const filter = buildTimeEntriesFilter(
        dateTime,
        '00000000-0000-0000-0000-000000000000'
      );
      expect(filter).toEqual(timeEntryFilter);
    });
  });
});
