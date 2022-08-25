import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../../../test/helpers/Helpers';

import ErrorSummary from './ErrorSummary';

describe('ErrorSummary', () => {
  it('should render an error summary component with all error messages', () => {
    const testErrors = {
      'test': { inputName: 'test', message: 'Date cannot be blank' },
      'test-day': { inputName: 'test-day', message: 'Enter a day' },
      'test-month': { inputName: 'test-month', message: 'Enter a month' },
      'test-year': { inputName: 'test-year', message: 'Enter a year' },
    }
    renderWithRouter(
      
      <ErrorSummary
        errors = {testErrors}
        keys = {['test', 'test-day', 'test-month', 'test-year']}
      />
    );

    const overallErrorMessage = screen.getByText('Date cannot be blank');
    const dayErrorMessage = screen.getByText('Enter a day');
    const monthErrorMessage = screen.getByText('Enter a month');
    const yearErrorMessage = screen.getByText('Enter a year');

    expect(overallErrorMessage).toBeTruthy();
    expect(dayErrorMessage).toBeTruthy();
    expect(monthErrorMessage).toBeTruthy();
    expect(yearErrorMessage).toBeTruthy();
  });
});
