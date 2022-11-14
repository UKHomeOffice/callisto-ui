import dayjs from 'dayjs';
import { filterTimeEntriesOnDate } from './timeEntryFilterBuilder';

describe('timeEntryFilterBuilder', () => {
  describe('filterTimeEntriesOnDate', () => {
    it('should return 2 filters that specify filtering time entries for the given date', () => {
      const date = '2022-10-29';
      const dateTime = dayjs(date + ' 19:18:09');
      const filters = filterTimeEntriesOnDate(dateTime);
      expect(filters).toHaveLength(2);

      // startOfDateFilter
      expect(filters[0]).toContain('actualStartTime');
      expect(filters[0]).toContain(date);

      // endOfDateFilter
      expect(filters[1]).toContain('actualStartTime');
      expect(filters[1]).toContain(date);
    });
  });
});
