import dayjs from 'dayjs';
import { filterOnOrAfterDate, filterBeforeDate } from './resourceFilterBuilder';

const dateTimeBST = '2022-10-29 19:18:09';
const dateTimeGMT = '2022-10-31 19:18:09';
const resourceDateProperty = 'startTime';

describe('resourceFilterBuilder', () => {
  describe('filterOnOrAfterDate', () => {
    it('should create a filter specifying that the resource property is greater or equal to midnight of the BST date', () => {
      let date = dayjs(dateTimeBST);
      expect(filterOnOrAfterDate(resourceDateProperty, date)).toEqual(
        resourceDateProperty + ">='2022-10-29T00:00:00+01:00'"
      );
    });

    it('should create a filter specifying that the resource property is greater or equal to midnight of the GMT date', () => {
      let date = dayjs(dateTimeGMT);
      expect(filterOnOrAfterDate(resourceDateProperty, date)).toEqual(
        resourceDateProperty + ">='2022-10-31T00:00:00+00:00'"
      );
    });
  });

  describe('filterBeforeDate', () => {
    it('should create a filter specifying that the resource property is less than or equal to the end of the BST date', () => {
      let date = dayjs(dateTimeBST);
      expect(filterBeforeDate(resourceDateProperty, date)).toEqual(
        resourceDateProperty + "<='2022-10-28T23:59:00+01:00'"
      );
    });

    it('should create a filter specifying that the resource property is less than or equal to the end of the GMT date', () => {
      let date = dayjs(dateTimeGMT);
      expect(filterBeforeDate(resourceDateProperty, date)).toEqual(
        resourceDateProperty + "<='2022-10-30T23:59:00+00:00'"
      );
    });
  });
});
