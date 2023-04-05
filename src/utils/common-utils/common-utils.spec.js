import ErrorSummary from '../../components/common/form/error-summary/ErrorSummary';
import { deepCloneJson, focusErrors } from './common-utils';
import { screen } from '@testing-library/react';
import { renderWithApplicationContext } from '../../test/helpers/TestApplicationContext';

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
      const testErrors = [];
      testErrors.push({
        key: 'invalidEnd',
        inputName: 'shift-finish-time',
        message: 'Test message for end time',
        errorPriority: 2,
      });
      testErrors.push({
        key: 'invalidStart',
        inputName: 'shift-start-time',
        message: 'Test message for start time',
        errorPriority: 1,
      });
      renderWithApplicationContext(<ErrorSummary errors={testErrors} />);
      const errorSummary = screen.getByText('Test message for start time');
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
