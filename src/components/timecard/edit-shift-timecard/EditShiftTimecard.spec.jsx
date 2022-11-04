import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { getApiResponseWithItems } from '../../../../mocks/mock-utils';
import { shiftTimeEntry } from '../../../../mocks/mockData';
import {
  createTimeEntry,
  deleteTimeEntry,
} from '../../../api/services/timecardService';

import {
  defaultApplicationContext,
  defaultTimecardContext,
  renderWithTimecardContext,
} from '../../../test/helpers/TimecardContext';
import EditShiftTimecard from './EditShiftTimecard';

jest.mock('../../../api/services/timecardService');

let existingTimeEntry;
beforeEach(() => {
  existingTimeEntry = {
    timeEntryId: '00000000-0000-0000-0000-000000000001',
    startTime: '2022-11-01T08:00:00Z',
    finishTime: '2022-11-01T16:00:00Z',
    timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
  };
});

const newTimeEntry = {
  timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
};

const otherTimeEntry = {
  timeEntryId: '00000000-0000-0000-0000-000000000002',
  startTime: '07:00',
  finishTime: '10:00',
  timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
};

describe('EditShiftTimecard', () => {
  it('should display a summary list with titles for shift, hours and meal break', () => {
    renderWithTimecardContext(
      <EditShiftTimecard timeEntry={existingTimeEntry} timeEntriesIndex={0} />
    );

    const shiftDetailsTitles = ['Shift', 'Hours', 'Meal break'];

    shiftDetailsTitles.map((title) => {
      expect(screen.getByText(title)).toBeTruthy();
    });
  });

  it('should show EditShiftHours component when first directed to page', async () => {
    renderWithTimecardContext(
      <EditShiftTimecard timeEntry={newTimeEntry} timeEntriesIndex={0} />
    );

    expect(screen.getByText('Start time')).toBeTruthy();
    expect(screen.getByText('Finish time')).toBeTruthy();
  });

  it('should hide EditShiftHours component when clicking "Save" on success', async () => {
    createTimeEntry.mockResolvedValue({
      data: getApiResponseWithItems(shiftTimeEntry),
    });

    renderWithTimecardContext(
      <EditShiftTimecard timeEntry={newTimeEntry} timeEntriesIndex={0} />
    );

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
      expect(createTimeEntry).toHaveBeenCalled();
    });
  });

  it('should render the "Remove" and "Change" buttons when there is timecard data', async () => {
    renderWithTimecardContext(
      <EditShiftTimecard timeEntry={existingTimeEntry} timeEntriesIndex={0} />
    );

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
    renderWithTimecardContext(
      <EditShiftTimecard timeEntry={existingTimeEntry} timeEntriesIndex={0} />
    );

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
    renderWithTimecardContext(
      <EditShiftTimecard timeEntry={newTimeEntry} timeEntriesIndex={0} />
    );

    const hoursChangeButton = screen.queryByTestId('hours-change-button');
    const removeShiftButton = screen.queryByText('Remove');
    const mealBreakChangeButton = screen.queryByTestId(
      'meal-break-change-button'
    );

    expect(hoursChangeButton).toBeFalsy();
    expect(removeShiftButton).toBeFalsy();
    expect(mealBreakChangeButton).toBeFalsy();
  });

  describe('Remove shift', () => {
    it('should delete time entry when clicking the "Remove" button', async () => {
      deleteTimeEntry.mockResolvedValue({ status: 200 });
      const mockSetTimeEntries = jest.fn();

      renderWithTimecardContext(
        <EditShiftTimecard
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
        />,
        {
          summaryErrors: {},
          setSummaryErrors: jest.fn(),
          timeEntries: [existingTimeEntry],
          setTimeEntries: mockSetTimeEntries,
          timecardDate: '2022-09-01',
          setTimecardDate: jest.fn(),
        }
      );

      const removeShiftButton = screen.getByText('Remove');
      fireEvent.click(removeShiftButton);

      await waitFor(() => {
        expect(mockSetTimeEntries).toHaveBeenCalledWith([]);
      });
    });

    it('should delete time entry when clicking the "Remove" button with multiple time entries', async () => {
      deleteTimeEntry.mockResolvedValue({ status: 200 });
      const mockSetTimeEntries = jest.fn();

      renderWithTimecardContext(
        <EditShiftTimecard
          timeEntry={existingTimeEntry}
          timeEntriesIndex={1}
        />,
        {
          summaryErrors: {},
          setSummaryErrors: jest.fn(),
          timeEntries: [otherTimeEntry, existingTimeEntry],
          setTimeEntries: mockSetTimeEntries,
          timecardDate: '2022-09-01',
          setTimecardDate: jest.fn(),
        }
      );

      const removeShiftButton = screen.getByText('Remove');
      fireEvent.click(removeShiftButton);

      await waitFor(() => {
        expect(mockSetTimeEntries).toHaveBeenCalledWith([otherTimeEntry]);
      });
    });

    it('should not display any service errors when deleting a time entry is successful', async () => {
      deleteTimeEntry.mockImplementation(() => {});

      renderWithTimecardContext(
        <EditShiftTimecard
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
        />,
        defaultTimecardContext,
        defaultApplicationContext
      );

      const removeShiftButton = screen.getByText('Remove');
      fireEvent.click(removeShiftButton);

      await waitFor(() => {
        expect(defaultApplicationContext.setServiceError).toHaveBeenCalledWith({
          hasError: false,
        });
      });
    });

    it('should display an error banner when deleting a time entry is unsuccessful', async () => {
      deleteTimeEntry.mockImplementation(() => {
        throw Error();
      });

      renderWithTimecardContext(
        <EditShiftTimecard
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
        />,
        defaultTimecardContext,
        defaultApplicationContext
      );

      const removeShiftButton = screen.getByText('Remove');
      fireEvent.click(removeShiftButton);

      await waitFor(() => {
        expect(defaultApplicationContext.setServiceError).toHaveBeenCalledWith({
          hasError: true,
          recoverable: true,
        });
      });
    });
  });

  describe('hours summary text', () => {
    it('should display start time on timecard when start time has been entered', async () => {
      existingTimeEntry.finishTime = '';
      existingTimeEntry.finishDate = '';

      renderWithTimecardContext(
        <EditShiftTimecard timeEntry={existingTimeEntry} timeEntriesIndex={0} />
      );

      expect(screen.getByText('08:00 to -')).toBeTruthy();
    });

    it('should display start and finish time on timecard when both times have been entered', async () => {
      renderWithTimecardContext(
        <EditShiftTimecard timeEntry={existingTimeEntry} timeEntriesIndex={0} />
      );

      expect(screen.getByText('08:00 to 16:00')).toBeTruthy();
    });

    it('should not display start and finish time on timecard when nothing has been entered', async () => {
      renderWithTimecardContext(
        <EditShiftTimecard timeEntry={newTimeEntry} timeEntriesIndex={0} />
      );

      expect(screen.queryByText('08:00 to 16:00')).toBeFalsy();
    });

    it('should not display start and finish time with date on timecard when nothing has been entered', async () => {
      renderWithTimecardContext(
        <EditShiftTimecard timeEntry={newTimeEntry} timeEntriesIndex={0} />
      );

      expect(screen.queryByText('08:00 to 16:00 on 31 October')).toBeFalsy();
    });

    it('should not display start, finish time on timecard when edit hours toggle is open', async () => {
      renderWithTimecardContext(
        <EditShiftTimecard timeEntry={existingTimeEntry} timeEntriesIndex={0} />
      );

      expect(screen.getByText('08:00 to 16:00')).toBeTruthy();

      act(() => {
        const changeButton = screen.getByTestId('hours-change-button');
        fireEvent.click(changeButton);
      });

      await waitFor(() => {
        expect(screen.queryByText('08:00 to 16:00')).toBeFalsy();
      });
    });

    it('should not display start, finish time and date on timecard when edit hours toggle is open', async () => {
      renderWithTimecardContext(
        <EditShiftTimecard timeEntry={existingTimeEntry} timeEntriesIndex={0} />
      );

      expect(screen.getByText(`08:00 to 16:00`)).toBeTruthy();

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
