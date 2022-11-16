import TimeInputErrors from '../../components/timecard/time-input-errors/TimeInputErrors';
import { clashingProperties, inputNames } from '../constants';
import { ContextTimeEntry } from './ContextTimeEntry';
import {
  isFinishTimeOnNextDay,
  getSingleTimeEntryResponseItem,
  removeTimecardContextEntry,
  combineExistingAndTimeClashErrors,
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

  describe('isFinishTimeOnNextDay', () => {
    it('should return true when finish time is midnight', async () => {
      const startTime = '12:03';
      const finishTime = '00:00';

      expect(isFinishTimeOnNextDay(startTime, finishTime)).toBeTruthy();
    });

    it('should return true when start time equals finish time', async () => {
      const startTime = '11:59';
      const finishTime = '11:59';

      expect(isFinishTimeOnNextDay(startTime, finishTime)).toBeTruthy();
    });

    it('should return true when start time is one minute before finish time', async () => {
      const startTime = '12:35';
      const finishTime = '12:34';

      expect(isFinishTimeOnNextDay(startTime, finishTime)).toBeTruthy();
    });

    it('should return false when finish time is one minute after start time', async () => {
      const startTime = '12:03';
      const finishTime = '12:04';

      expect(isFinishTimeOnNextDay(startTime, finishTime)).toBeFalsy();
    });

    it('should return false when finish time is empty', async () => {
      const startTime = '08:00';
      const finishTime = '';

      expect(isFinishTimeOnNextDay(startTime, finishTime)).toBeFalsy();
    });

    it('should return false when both start and finish time are empty', async () => {
      const startTime = '';
      const finishTime = '';

      expect(isFinishTimeOnNextDay(startTime, finishTime)).toBeFalsy();
    });
  });

  describe('combineExistingAndTimeClashErrors', () => {
    it('should return an empty array when no errors are passed in', async () => {
      var result = combineExistingAndTimeClashErrors({}, {}, null, null);

      expect(result).toEqual({});
    });

    it('should return only the original errors when no time clash errors are passed in', async () => {
      var result = combineExistingAndTimeClashErrors(
        { foo: 'bar' },
        {},
        null,
        null
      );

      expect(result).toEqual({ foo: 'bar' });
    });

    it('should add a start time error when start time is the clashing property', async () => {
      var expectedClashMessage = (
        <TimeInputErrors
          clashes={[]}
          clashingProperty={clashingProperties.startTime}
        />
      );

      var result = combineExistingAndTimeClashErrors(
        { foo: 'bar' },
        {},
        clashingProperties.startTime,
        []
      );

      expect(result).toEqual({
        foo: 'bar',
        [inputNames.shiftStartTime]: { message: expectedClashMessage },
      });
    });

    it('should add a finish time error when finish time is the clashing property', async () => {
      var expectedClashMessage = (
        <TimeInputErrors
          clashes={[]}
          clashingProperty={clashingProperties.endTime}
        />
      );

      var result = combineExistingAndTimeClashErrors(
        { foo: 'bar' },
        {},
        clashingProperties.endTime,
        []
      );

      expect(result).toEqual({
        foo: 'bar',
        [inputNames.shiftFinishTime]: { message: expectedClashMessage },
      });
    });

    it('should add a start and end time error when start and end time time is the clashing property', async () => {
      var expectedClashMessage = (
        <TimeInputErrors
          clashes={[]}
          clashingProperty={clashingProperties.startAndEndTime}
        />
      );

      var result = combineExistingAndTimeClashErrors(
        { foo: 'bar' },
        {},
        clashingProperties.startAndEndTime,
        []
      );

      expect(result).toEqual({
        foo: 'bar',
        [inputNames.shiftStartTime]: { message: expectedClashMessage },
        [inputNames.shiftFinishTime]: { message: '' },
      });
    });
  });
});
