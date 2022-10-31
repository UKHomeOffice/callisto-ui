import { ContextTimeEntry } from './ContextTimeEntry';
import {
  calculateFinishTimeOnNextDay,
  getSingleTimeEntryResponseItem,
  removeTimecardContextEntry,
} from './timeEntryUtils';

describe('timeEntryUtils', () => {
  describe('getSingleTimeEntryResponseItem', () => {
    it('should return the first item in the array', () => {
      const timeEntryResponseData = {
        items: [
          {
            test: 'test',
          },
        ],
      };
      const result = getSingleTimeEntryResponseItem(timeEntryResponseData);
      expect(result).toStrictEqual({
        test: 'test',
      });
    });

    it('should throw an error if there is not at least one item in the resposne array', () => {
      const timeEntryResponseData = {
        items: [],
      };

      try {
        getSingleTimeEntryResponseItem(timeEntryResponseData);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('time entry');
        expect(error.message).toContain('at least one time entry');
      }
    });
  });

  it('should delete the time entry from the time entries context at the given index', async () => {
    const timeEntry1 = new ContextTimeEntry();
    const timeEntry2 = new ContextTimeEntry();
    const existingTimeEntries = [timeEntry1, timeEntry2];
    const mockSetTimeEntries = jest.fn();
    removeTimecardContextEntry(existingTimeEntries, mockSetTimeEntries, 1);
    expect(mockSetTimeEntries).toHaveBeenCalledWith([timeEntry1]);
  });

  describe('calculateFinishTimeOnNextDay', () => {
    it('should return greater than 1', async () => {
      const startTime = '12:03';
      const finishTime = '01:01';

      expect(
        calculateFinishTimeOnNextDay(startTime, finishTime)
      ).toBeGreaterThan(1);
    });

    it('should return less than 1', async () => {
      const startTime = '12:03';
      const finishTime = '12:04';

      expect(calculateFinishTimeOnNextDay(startTime, finishTime)).toBeLessThan(
        1
      );
    });

    it('should return nothing', async () => {
      const startTime = '';
      const finishTime = '';

      expect(
        calculateFinishTimeOnNextDay(startTime, finishTime)
      ).toBeUndefined();
    });
  });
});
