import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Timecard from './Timecard';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    date: '2022-07-01',
  }),
}));

describe('Timecard', () => {
  it('should render a timecard component with the correct date', () => {
    render(<Timecard />, { wrapper: MemoryRouter });

    const date = screen.getByText('01 July 2022');
    expect(date).toBeTruthy();
  });

  describe('No time entries', () => {
    it('should render the add shift component when no time entries have been added', () => {
      render(<Timecard />, { wrapper: MemoryRouter });

      const heading = screen.getByText('Add a new time period');
      expect(heading).toBeTruthy();
    });
  });

  describe('navigation', () => {
    it('should contain a link to previous day', () => {
      render(<Timecard />, { wrapper: MemoryRouter });

      const previousDayLink = screen.getByText('Previous day');
      expect(previousDayLink.pathname).toBe('/timecard/2022-06-30');
    });

    it('should contain a link to next day', () => {
      render(<Timecard />, { wrapper: MemoryRouter });

      const nextDayLink = screen.getByText('Next day');
      expect(nextDayLink.pathname).toBe('/timecard/2022-07-02');
    });

    it('should contain a link to the calendar', () => {
      render(<Timecard />, { wrapper: MemoryRouter });

      const calendarLink = screen.getByText('Select another date');
      expect(calendarLink.pathname).toBe('/calendar');
    });
  });
});