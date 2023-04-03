import { screen } from '@testing-library/react';
import ErrorSummary from './ErrorSummary';
import { renderWithApplicationContext } from '../../../../test/helpers/TestApplicationContext';

describe('ErrorSummary', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  it('should render an error summary component with all error messages', () => {
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

    const dayErrorMessage = screen.getByText('Test message for start time');
    const monthErrorMessage = screen.getByText('Test message for end time');

    expect(dayErrorMessage).toBeTruthy();
    expect(monthErrorMessage).toBeTruthy();
  });
});
