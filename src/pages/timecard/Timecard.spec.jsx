import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router';

import Timecard from './Timecard';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    date: '2022-07-01',
  }),
  useNavigate: () => mockNavigate,
}));

describe('Timecard', () => {
  it('should render a timecard component with the correct date', () => {
    render(<Timecard />, { wrapper: MemoryRouter });

    const date = screen.getByText('01 July 2022');
    expect(date).toBeTruthy();
  });

  describe('No time entries', () => {
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

    it('should display an error when pressing submit with nothing selected', async () => {
      render(<Timecard />, { wrapper: MemoryRouter });

      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      const errorMessage = await screen.findByText('Select a shift type');
      expect(errorMessage).toBeTruthy();
    });

    it('should navigate to next page when pressing continue with time period selected', async () => {
      jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);

      render(<Timecard />, { wrapper: MemoryRouter });

      const radioButton = screen.getByLabelText('Shift');
      fireEvent.click(radioButton, { target: { checked: true } });

      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/next-page');
      });
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

      const nextDayLink = screen.getByText('Choose another day');
      expect(nextDayLink.pathname).toBe('/calendar');
    });
  });
});
