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

  describe('radios', () => {
    it('should display the correct heading', () => {
      render(<Timecard />, { wrapper: MemoryRouter });

      const heading = screen.getByText('Add a new time period');
      expect(heading).toBeTruthy();
    });

    it('should render a radios component with the correct shift types', () => {
      const shiftTypes = [
        'Shift',
        'Scheduled rest day',
        'Non-working day',
        'On call',
        'Absence',
        'Training',
        'Overtime',
      ];

      render(<Timecard />, { wrapper: MemoryRouter });

      shiftTypes.map((option) => {
        expect(screen.getByText(option)).toBeTruthy();
      });
    });

    //   it('should display an error when pressing submit with nothing selected', () => {
    //     render(<Timecard />, { wrapper: MemoryRouter });

    //     const continueButton = screen.getByText('Continue');
    //     fireEvent.click(continueButton);

    //     const errorMessage = screen.getByText('Select a shift type');
    //     expect(errorMessage).toBeTruthy();
    //   });
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
