import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';
import EditShiftTimecard from './EditShiftTimecard';

describe('EditShiftTimecard', () => {
  it('should display a summary list with titles for shift, hours and meal break', () => {
    render(<EditShiftTimecard />, {
      wrapper: MemoryRouter,
    });

    const shiftDetailsTitles = ['Shift', 'Hours', 'Meal break'];

    shiftDetailsTitles.map((title) => {
      expect(screen.getByText(title)).toBeTruthy();
    });
  });

  it('should show EditShiftHours component when clicking "Change" button', async () => {
    render(<EditShiftTimecard />, {
      wrapper: MemoryRouter,
    });

    const changeButton = screen.getByTestId('shift-change-button');

    expect(screen.queryByText('Start time')).toBeFalsy();
    expect(screen.queryByText('Finish time')).toBeFalsy();

    fireEvent.click(changeButton);

    await waitFor(() => {
      expect(screen.getByText('Start time')).toBeTruthy();
      expect(screen.getByText('Finish time')).toBeTruthy();
    });
  });

  it('should hide EditShiftHours component when clicking "Change" button twice', async () => {
    render(<EditShiftTimecard />, {
      wrapper: MemoryRouter,
    });

    const changeButton = screen.getByTestId('shift-change-button');

    expect(screen.queryByText('Start time')).toBeFalsy();
    expect(screen.queryByText('Finish time')).toBeFalsy();

    fireEvent.click(changeButton);
    await waitFor(() => {
      expect(screen.getByText('Start time')).toBeTruthy();
      expect(screen.getByText('Finish time')).toBeTruthy();
    });

    fireEvent.click(changeButton);
    await waitFor(() => {
      expect(screen.queryByText('Start time')).toBeFalsy();
      expect(screen.queryByText('Finish time')).toBeFalsy();
    });
  });
});
