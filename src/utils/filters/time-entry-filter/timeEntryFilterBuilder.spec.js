import dayjs from 'dayjs';
import { filterTimeEntriesOnDate } from './timeEntryFilterBuilder';

describe('timeEntryFilterBuilder', () => {
  describe('filterTimeEntriesOnDate', () => {
    it('should return 2 filters that specify filtering time entries for the given date', () => {
      const date = '2022-10-29';
      const dateTime = dayjs(date + ' 19:18:09');
      const filters = filterTimeEntriesOnDate(dateTime);
      expect(filters).toHaveLength(2);
      expect(
        filters.map((filter) => {
          expect(filter).toContain('actualEndTime');
          expect(filter).toContain(date);
        })
      );
    });
  });
});
