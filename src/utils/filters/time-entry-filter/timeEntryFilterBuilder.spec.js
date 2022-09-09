import dayjs from 'dayjs';
import { filterTimeEntriesOnDate } from './timeEntryFilterBuilder';

describe('timeEntryFilterBuilder', () => {
  describe('filterTimeEntriesOnDate', () => {
    it('should return 2 filters that specify filtering time entries for the given date', () => {
      let date = '2022-10-29';
      let dateTime = dayjs(date + ' 19:18:09');
      let filters = filterTimeEntriesOnDate(dateTime);
      expect(filters).toHaveLength(2);
      expect(
        filters.map((filter) => {
          expect(filter).toContain('actualStartTime');
          expect(filter).toContain(date);
        })
      );
    });
  });
});
