import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import SummaryList from './SummaryList';
import { renderWithRouter } from '../../../test/helpers/Helpers';

describe('SummaryList', () => {
  it('should render summary list with correct first row', () => {
    renderWithRouter(
      <SummaryList
        rows={[
          {
            title: 'Shift',
            value: 'Early shift',
            action: 'Remove',
            link: '/remove-shift',
          },
        ]}
      />
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
    renderWithRouter(
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
      />
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
