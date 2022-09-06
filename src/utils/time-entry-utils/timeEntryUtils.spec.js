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

    it('should return null if there are no items in the array', () => {
      const timeEntryResponseData = {
        items: [],
      };
      const result = getSingleTimeEntryResponseItem(timeEntryResponseData);
      expect(result).toBeNull();
    });
  });
});
