import dayjs from 'dayjs';
import { formatDate } from '../../time-entry-utils/timeEntryUtils';
import {
  filterOnOrAfterDate,
  filterBeforeDate,
  joinOrConditions,
  joinAndConditions,
} from './resourceFilterBuilder';

const date = '2022-10-29';
const dateTime = date + ' 19:18:09';
const resourceDateProperty = 'startTime';

describe('resourceFilterBuilder', () => {
  it('should create a filter specifying that the resource property is greater or equal to midnight of the date', () => {
    expect(filterOnOrAfterDate(resourceDateProperty, dateTime)).toEqual(
      `${resourceDateProperty}>='${date}T00:00:00+00:00'`
    );
  });

  it('should create a filter specifying that the resource property is less than or equal to the end of the date', () => {
    const yesterday = formatDate(dayjs(date).subtract(1, 'minute'));
    expect(filterBeforeDate(resourceDateProperty, dateTime)).toEqual(
      `${resourceDateProperty}<='${yesterday}T23:59:00+00:00'`
    );
  });
  it('should join two conditions with or', () => {
    const expression1 = 'expression1';
    const expression2 = 'expression2';
    const returnStatment = joinOrConditions(expression1, expression2);
    expect(returnStatment).toEqual('expression1||expression2');
  });
  it('should return the expression without or operator', () => {
    const expression1 = 'expression1';
    const returnStatment = joinOrConditions(expression1);
    expect(returnStatment).toEqual('expression1');
  });
  it('should join two conditions with and', () => {
    const expression1 = 'expression1';
    const expression2 = 'expression2';
    const returnStatment = joinAndConditions(expression1, expression2);
    expect(returnStatment).toEqual('expression1&&expression2');
  });
  it('should return the expression without and operator', () => {
    const expression1 = 'expression1';
    const returnStatment = joinAndConditions(expression1);
    expect(returnStatment).toEqual('expression1');
  });
});
