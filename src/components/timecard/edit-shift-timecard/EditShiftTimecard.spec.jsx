import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';

import { renderWithTimecardContext } from '../../../test/Helpers';
import EditShiftTimecard from './EditShiftTimecard';

describe('EditShiftTimecard', () => {
  it('should display a summary list with titles for shift, hours and meal break', () => {
    renderWithTimecardContext(<EditShiftTimecard />);

    const shiftDetailsTitles = ['Shift', 'Hours', 'Meal break'];

    shiftDetailsTitles.map((title) => {
      expect(screen.getByText(title)).toBeTruthy();
    });
  });

  it('should show EditShiftHours component when first directed to page', async () => {
    renderWithTimecardContext(<EditShiftTimecard />);

    expect(screen.getByText('Start time')).toBeTruthy();
    expect(screen.getByText('Finish time')).toBeTruthy();
  });

  it('should hide EditShiftHours component when clicking "Save" on success', async () => {
    renderWithTimecardContext(<EditShiftTimecard />);

    const startTimeInput = screen.getByTestId('start-time-input');
    const finishTimeInput = screen.getByTestId('finish-time-input');

    fireEvent.change(startTimeInput, { target: { value: '08:00' } });
    fireEvent.change(finishTimeInput, { target: { value: '16:00' } });

    act(() => {
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(screen.queryByText('Start time')).toBeFalsy();
      expect(screen.queryByText('Finish time')).toBeFalsy();
    });
  });

  it('should render the "Change" button when there is timecard data', async () => {
    renderWithTimecardContext(<EditShiftTimecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timecardData: {
        startTime: '08:00',
        endTime: '16:00',
      },
      setTimecardData: jest.fn(),
    });

    const changeButton = screen.getByTestId('hours-change-button');
    expect(changeButton).toBeTruthy();
  });

  it('should not render the "Change" button when there is no timecard data', async () => {
    renderWithTimecardContext(<EditShiftTimecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timecardData: {
        startTime: '',
        endTime: '',
      },
      setTimecardData: jest.fn(),
    });

    const changeButton = screen.queryByTestId('hours-change-button');
    expect(changeButton).toBeFalsy();
  });
});
