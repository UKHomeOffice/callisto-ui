import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

import SummaryList from './SummaryList';

describe('SummaryList', () => {
  it('should render summary list with correct first row', () => {
    render(
      <SummaryList
        rows={[
          {
            title: 'Shift',
            value: 'Early shift',
            action: 'Remove',
            link: '/remove-shift',
          },
        ]}
      />,
      { wrapper: BrowserRouter }
    );

    const title = screen.getByText('Shift');
    const value = screen.getByText('Early shift');
    const action = screen.getByText('Remove');

    expect(title).toBeTruthy();
    expect(value).toBeTruthy();
    expect(action).toBeTruthy();
    expect(action.getAttribute('href')).toBe('/remove-shift');
  });

  it('should render summary list with correct second row', () => {
    render(
      <SummaryList
        rows={[
          {
            title: 'Shift',
            value: 'Early shift',
            action: 'Remove',
            link: '/remove-shift',
          },
          {
            title: 'Hours',
            value: '08:00 - 16:30',
            action: 'Change',
            link: '/change-hours',
          },
        ]}
      />,
      { wrapper: BrowserRouter }
    );

    const title = screen.getByText('Hours');
    const value = screen.getByText('08:00 - 16:30');
    const action = screen.getByText('Change');

    expect(title).toBeTruthy();
    expect(value).toBeTruthy();
    expect(action).toBeTruthy();
    expect(action.getAttribute('href')).toBe('/change-hours');
  });

  it('should render summary list without action if not passed in', () => {
    render(
      <SummaryList
        rows={[
          {
            title: 'Test row',
            value: 'Example value',
          },
        ]}
      />
    );

    const title = screen.getByText('Test row');
    const value = screen.getByText('Example value');
    const action = screen.queryByTestId('summary-actions');

    expect(title).toBeTruthy();
    expect(value).toBeTruthy();
    expect(action).toBeFalsy();
  });
});
