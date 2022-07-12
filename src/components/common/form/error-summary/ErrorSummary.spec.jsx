import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ErrorSummary from './ErrorSummary';

describe('ErrorSummary', () => {
  it('should render an error summary component with all error messages', () => {
    render(
      <ErrorSummary
        errors={[
          { inputName: 'test', message: 'Date cannot be blank' },
          { inputName: 'test-day', message: 'Enter a day' },
          { inputName: 'test-month', message: 'Enter a month' },
          { inputName: 'test-year', message: 'Enter a year' },
        ]}
      />,
      { wrapper: BrowserRouter }
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
