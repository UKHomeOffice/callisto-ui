import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router';
import { act } from 'react-test-renderer';

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
    it('should render the add time period component when no time entries have been added', () => {
      render(<Timecard />, { wrapper: MemoryRouter });

      const heading = screen.getByText('Add a new time period');
      expect(heading).toBeTruthy();
    });

    it('should display an error message and error summary box when pressing submit with nothing selected', async () => {
      render(<Timecard />, { wrapper: MemoryRouter });

      act(() => {
        const continueButton = screen.getByText('Continue');
        fireEvent.click(continueButton);
      });

      await waitFor(() => {
        const errorMessages = screen.getAllByText(
          'You must select a time period'
        );
        expect(errorMessages.length).toBe(2);
      });
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

      const calendarLink = screen.getByText('Select another date');
      expect(calendarLink.pathname).toBe('/calendar');
    });
  });
});
