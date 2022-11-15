import ErrorSummary from '../../components/common/form/error-summary/ErrorSummary';
import { deepCloneJson, focusErrors } from './common-utils';
import { renderWithTimecardContext } from '../../test/helpers/TimecardContext';
import { screen } from '@testing-library/react';

describe('common-utils', () => {
  describe('deepClone', () => {
    it('should deep clone an object', () => {
      const input = { test: 'test' };
      const result = deepCloneJson(input);

      expect(result).not.toBe(input);
      expect(result).toEqual(input);
    });

    it('should deep clone an array of objects', () => {
      const input = [{ test: 'test' }, { secondTest: 'hello' }];
      const result = deepCloneJson(input);

      expect(result).not.toBe(input);
      expect(result).toEqual(input);
    });
  });

  describe('focusErrors', () => {
    it('should set the summary error to have focus and scroll into view', () => {
      const scroll = (window.HTMLElement.prototype.scrollIntoView = jest.fn());
      const testErrors = {
        test: { inputName: 'test', message: 'Date cannot be blank' },
        'test-day': { inputName: 'test-day', message: 'Enter a day' },
        'test-month': { inputName: 'test-month', message: 'Enter a month' },
        'test-year': { inputName: 'test-year', message: 'Enter a year' },
      };
      renderWithTimecardContext(
        <ErrorSummary
          errors={testErrors}
          keys={['test', 'test-day', 'test-month', 'test-year']}
        />
      );
      const errorSummary = screen.getByText('Date cannot be blank');
      focusErrors(errorSummary);
      expect(scroll).toBeCalled();
      expect(errorSummary).toHaveFocus;
    });
    it('should set the summary error to not scroll into view', () => {
      const scroll = (window.HTMLElement.prototype.scrollIntoView = jest.fn());
      const errorSummary = '';
      focusErrors(errorSummary);
      expect(scroll).toBeCalledTimes(0);
    });
  });
});
