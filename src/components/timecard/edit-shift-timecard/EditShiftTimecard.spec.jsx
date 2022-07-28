import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';

import { renderWithTimecardContext } from '../../../test/helpers/TimecardContext';
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
        finishTime: '16:00',
      },
      setTimecardData: jest.fn(),
    });

    const changeButton = screen.getByTestId('hours-change-button');
    expect(changeButton).toBeTruthy();
  });

  it('should show EditShiftHours component when clicking "Change" button', async () => {
    renderWithTimecardContext(<EditShiftTimecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timecardData: {
        startTime: '08:00',
        finishTime: '16:00',
      },
      setTimecardData: jest.fn(),
    });

    act(() => {
      const changeButton = screen.getByTestId('hours-change-button');
      fireEvent.click(changeButton);
    });

    await waitFor(() => {
      expect(screen.queryByText('Start time')).toBeTruthy();
      expect(screen.queryByText('Finish time')).toBeTruthy();
    });
  });

  it('should not render the "Change" button when there is no timecard data', async () => {
    renderWithTimecardContext(<EditShiftTimecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timecardData: {
        startTime: '',
        finishTime: '',
      },
      setTimecardData: jest.fn(),
    });

    const changeButton = screen.queryByTestId('hours-change-button');
    expect(changeButton).toBeFalsy();
  });

  describe('hours summary text', () => {
    it('should display start time on timecard when start time has been entered', async () => {
      renderWithTimecardContext(<EditShiftTimecard />, {
        summaryErrors: {},
        setSummaryErrors: jest.fn(),
        timecardData: {
          timePeriodType: 'Shift',
          startTime: '08:00',
          finishTime: '',
        },
        setTimecardData: jest.fn(),
      });

      expect(screen.getByText('08:00 to -')).toBeTruthy();
    });

    it('should display start and finish time on timecard when both times have been entered', async () => {
      renderWithTimecardContext(<EditShiftTimecard />, {
        summaryErrors: {},
        setSummaryErrors: jest.fn(),
        timecardData: {
          startTime: '08:00',
          finishTime: '16:00',
        },
        setTimecardData: jest.fn(),
      });

      expect(screen.getByText('08:00 to 16:00')).toBeTruthy();
    });

    it('should not display start and finish time on timecard when nothing has been entered', async () => {
      renderWithTimecardContext(<EditShiftTimecard />, {
        summaryErrors: {},
        setSummaryErrors: jest.fn(),
        timecardData: {
          startTime: '',
          finishTime: '',
        },
        setTimecardData: jest.fn(),
      });

      expect(screen.queryByText('08:00 to 16:00')).toBeFalsy();
    });

    it('should not display start and finish time on timecard when edit hours toggle is open', async () => {
      renderWithTimecardContext(<EditShiftTimecard />, {
        summaryErrors: {},
        setSummaryErrors: jest.fn(),
        timecardData: {
          startTime: '08:00',
          finishTime: '16:00',
        },
        setTimecardData: jest.fn(),
      });

      expect(screen.getByText('08:00 to 16:00')).toBeTruthy();

      act(() => {
        const changeButton = screen.getByTestId('hours-change-button');
        fireEvent.click(changeButton);
      });

      await waitFor(() => {
        expect(screen.queryByText('08:00 to 16:00')).toBeFalsy();
      });
    });
  });
});
