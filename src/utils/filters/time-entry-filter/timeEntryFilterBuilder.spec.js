import dayjs from 'dayjs';
import {
  buildTimeCardFilter,
  filterTimeEntriesOnDate,
} from './timeEntryFilterBuilder';
import { timeCardShiftFilter } from '../../../../mocks/mockData';

describe('timeEntryFilterBuilder', () => {
  describe('filterTimeEntriesOnDate', () => {
    it('should return 2 filters that specify filtering time entries for the given date', () => {
      const date = '2022-10-29';
      const dateTime = dayjs(date + ' 19:18:09');
      const filters = filterTimeEntriesOnDate('actualStartTime', dateTime);
      expect(filters).toHaveLength(2);

      // startOfDateFilter
      expect(filters[0]).toContain('actualStartTime');
      expect(filters[0]).toContain(date);

      // endOfDateFilter
      expect(filters[1]).toContain('actualStartTime');
      expect(filters[1]).toContain(date);
    });
  });
  describe('buildTimeCardFilter', () => {
    it('should return the timecard filter containing start and end time', () => {
      const date = '20220-10-29';
      const dateTime = dayjs(date + ' 19:18:;09');
      const filter = buildTimeCardFilter(
        dateTime,
        '00000000-0000-0000-0000-000000000000'
      );
      expect(filter).toEqual(timeCardShiftFilter);
    });
  });
});
