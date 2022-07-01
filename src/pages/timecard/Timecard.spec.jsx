import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Timecard from './Timecard';

describe('Timecard', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      date: '2022-07-01',
    }),
  }));

  it('should render a timecard component with the correct date', () => {
    render(<Timecard />, { wrapper: MemoryRouter });

    const date = screen.getByText('01 July 2022');
    expect(date).toBeTruthy();
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

      const nextDayLink = screen.getByText('Choose another day');
      expect(nextDayLink.pathname).toBe('/calendar');
    });
  });
});
