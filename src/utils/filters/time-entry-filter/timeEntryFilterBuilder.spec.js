import dayjs from 'dayjs';
import { buildTimeEntriesFilter } from './timeEntryFilterBuilder';
import { timeEntryFilter } from '../../../../mocks/mockData';

describe('timeEntryFilterBuilder', () => {
  describe('buildTimeEntriesFilter', () => {
    it('should return the timecard filter containing start and end time', () => {
      const dateTime = dayjs('2022-10-29 19:18:09');
      const filter = buildTimeEntriesFilter(
        dateTime,
        '00000000-0000-0000-0000-000000000000'
      );
      expect(filter).toEqual(timeEntryFilter);
    });
  });
});
