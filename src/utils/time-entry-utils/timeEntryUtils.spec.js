import { getSingleTimeEntryResponseItem } from './timeEntryUtils';

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
});
