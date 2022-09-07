import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { newTimeCardEntry } from '../../../../mocks/mockData';
import { saveTimeEntry } from '../../../api/services/timecardService';

import { renderWithTimecardContext } from '../../../test/helpers/TimecardContext';
import EditShiftTimecard from './EditShiftTimecard';

jest.mock('../../../api/services/timecardService');

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
    saveTimeEntry.mockResolvedValue({ data: newTimeCardEntry });

    renderWithTimecardContext(<EditShiftTimecard />);

    const startTimeInput = screen.getByTestId('shift-start-time');
    const finishTimeInput = screen.getByTestId('shift-finish-time');

    fireEvent.change(startTimeInput, { target: { value: '08:00' } });
    fireEvent.change(finishTimeInput, { target: { value: '16:00' } });

    act(() => {
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(screen.queryByText('Start time')).toBeFalsy();
      expect(screen.queryByText('Finish time')).toBeFalsy();
      expect(saveTimeEntry).toHaveBeenCalled();
    });
  });

  it('should render the "Remove" and "Change" buttons when there is timecard data', async () => {
    renderWithTimecardContext(<EditShiftTimecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timeEntries: {
        timePeriodType: 'Shift',
        startTime: '08:00',
        finishTime: '16:00',
      },
      setTimeEntries: jest.fn(),
    });

    const hoursChangeButton = screen.queryByTestId('hours-change-button');
    const removeShiftButton = screen.queryByText('Remove');
    const mealBreakChangeButton = screen.queryByTestId(
      'meal-break-change-button'
    );

    expect(hoursChangeButton).toBeTruthy();
    expect(removeShiftButton).toBeTruthy();
    expect(mealBreakChangeButton).toBeTruthy();
  });

  it('should show EditShiftHours component when clicking "Change" button', async () => {
    renderWithTimecardContext(<EditShiftTimecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timeEntries: {
        timePeriodType: 'Shift',
        startTime: '08:00',
        finishTime: '16:00',
      },
      setTimeEntries: jest.fn(),
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

  it('should not render the "Remove" or "Change" buttons when there is no timecard data', async () => {
    renderWithTimecardContext(<EditShiftTimecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timeEntries: {
        timePeriodType: 'Shift',
        startTime: '',
        finishTime: '',
      },
      setTimeEntries: jest.fn(),
    });

    const hoursChangeButton = screen.queryByTestId('hours-change-button');
    const removeShiftButton = screen.queryByText('Remove');
    const mealBreakChangeButton = screen.queryByTestId(
      'meal-break-change-button'
    );

    expect(hoursChangeButton).toBeFalsy();
    expect(removeShiftButton).toBeFalsy();
    expect(mealBreakChangeButton).toBeFalsy();
  });

  describe('hours summary text', () => {
    it('should display start time on timecard when start time has been entered', async () => {
      renderWithTimecardContext(<EditShiftTimecard />, {
        summaryErrors: {},
        setSummaryErrors: jest.fn(),
        timeEntries: {
          timePeriodType: 'Shift',
          startTime: '08:00',
          finishTime: '',
        },
        setTimeEntries: jest.fn(),
      });

      expect(screen.getByText('08:00 to -')).toBeTruthy();
    });

    it('should display start and finish time on timecard when both times have been entered', async () => {
      renderWithTimecardContext(<EditShiftTimecard />, {
        summaryErrors: {},
        setSummaryErrors: jest.fn(),
        timeEntries: {
          startTime: '08:00',
          finishTime: '16:00',
        },
        setTimeEntries: jest.fn(),
      });

      expect(screen.getByText('08:00 to 16:00')).toBeTruthy();
    });

    it('should not display start and finish time on timecard when nothing has been entered', async () => {
      renderWithTimecardContext(<EditShiftTimecard />, {
        summaryErrors: {},
        setSummaryErrors: jest.fn(),
        timeEntries: {
          startTime: '',
          finishTime: '',
        },
        setTimeEntries: jest.fn(),
      });

      expect(screen.queryByText('08:00 to 16:00')).toBeFalsy();
    });

    it('should not display start and finish time on timecard when edit hours toggle is open', async () => {
      renderWithTimecardContext(<EditShiftTimecard />, {
        summaryErrors: {},
        setSummaryErrors: jest.fn(),
        timeEntries: {
          startTime: '08:00',
          finishTime: '16:00',
        },
        setTimeEntries: jest.fn(),
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
