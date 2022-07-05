import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router';

import AddShift from './AddShift';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AddShift', () => {
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

    render(<AddShift />, { wrapper: MemoryRouter });

    shiftTypes.map((option) => {
      expect(screen.getByText(option)).toBeTruthy();
    });
  });

  it('should display an error when pressing submit with nothing selected', async () => {
    render(<AddShift />, { wrapper: MemoryRouter });

    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    const errorMessage = await screen.findByText('Select a shift type');
    expect(errorMessage).toBeTruthy();
  });

  it('should navigate to next page when pressing continue with time period selected', async () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);

    render(<AddShift />, { wrapper: MemoryRouter });

    const radioButton = screen.getByLabelText('Shift');
    fireEvent.click(radioButton, { target: { checked: true } });

    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/next-page');
    });
  });
});
