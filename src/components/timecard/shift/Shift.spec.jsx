import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { renderWithApplicationContext } from '../../../test/helpers/TestApplicationContext';
import Shift from '../shift/Shift';

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

describe('Shift', () => {
  it('should display a summary list with titles for time period, hours and meal break', () => {
    renderWithApplicationContext(
      <Shift
        summaryErrors={[]}
        timeEntry={existingTimeEntry}
        timeEntriesIndex={0}
      />
    );

    const shiftDetailsTitles = ['Time period', 'Hours', 'Meal break'];

    shiftDetailsTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeTruthy();
    });
  });

  it('should show EditShift component when first directed to page', async () => {
    renderWithApplicationContext(
      <Shift summaryErrors={[]} timeEntry={newTimeEntry} timeEntriesIndex={0} />
    );

    expect(screen.getByText('Start time')).toBeTruthy();
    expect(screen.getByText('Finish time')).toBeTruthy();
  });

  it('should render the "Remove" and "Change" buttons when there is timecard data', async () => {
    renderWithApplicationContext(
      <Shift
        summaryErrors={[]}
        timeEntry={existingTimeEntry}
        timeEntriesIndex={0}
      />
    );

    await waitFor(() => {
      const hoursChangeButton = screen.queryByTestId('hours-change-button');
      const removeShiftButton = screen.queryByText('Remove');
      const mealBreakChangeButton = screen.queryByTestId(
        'meal-break-change-button'
      );

      expect(hoursChangeButton).toBeTruthy();
      expect(removeShiftButton).toBeTruthy();
      expect(mealBreakChangeButton).toBeTruthy();
    });
  });

  it('should show EditShift component when clicking "Change" button', async () => {
    renderWithApplicationContext(
      <Shift
        summaryErrors={[]}
        timeEntry={existingTimeEntry}
        timeEntriesIndex={0}
      />
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
    renderWithApplicationContext(
      <Shift summaryErrors={[]} timeEntry={newTimeEntry} timeEntriesIndex={0} />
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

  describe('hours summary text', () => {
    it('should display start time on timecard when start time has been entered', async () => {
      existingTimeEntry.finishTime = '';
      existingTimeEntry.finishDate = '';

      renderWithApplicationContext(
        <Shift
          summaryErrors={[]}
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
        />
      );

      expect(screen.getByText('08:00 to -')).toBeTruthy();
    });

    it('should display start and finish time on timecard when both times have been entered', async () => {
      renderWithApplicationContext(
        <Shift timeEntry={existingTimeEntry} timeEntriesIndex={0} />
      );

      expect(screen.getByText('08:00 to 16:00')).toBeTruthy();
    });

    it('should not display start and finish time on timecard when nothing has been entered', async () => {
      renderWithApplicationContext(
        <Shift
          summaryErrors={[]}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />
      );

      expect(screen.queryByText('08:00 to 16:00')).toBeFalsy();
    });

    it('should not display start and finish time with date on timecard when nothing has been entered', async () => {
      renderWithApplicationContext(
        <Shift
          summaryErrors={[]}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />
      );

      expect(screen.queryByText('08:00 to 16:00')).toBeFalsy();
      expect(screen.queryByText('08:00 to 16:00 on 31 October')).toBeFalsy();
    });

    it('should not display start, finish time on timecard when edit hours toggle is open', async () => {
      renderWithApplicationContext(
        <Shift
          summaryErrors={[]}
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
        />
      );

      expect(screen.getByText('08:00 to 16:00')).toBeTruthy();

      act(() => {
        const changeButton = screen.getByTestId('hours-change-button');
        fireEvent.click(changeButton);
      });

      await waitFor(() => {
        expect(screen.queryByText('08:00 to 16:00')).toBeFalsy();
        expect(screen.queryByText('08:00 to 16:00 on 31 October')).toBeFalsy();
      });
    });

    it('should not display start, finish time and date on timecard when edit hours toggle is open', async () => {
      renderWithApplicationContext(
        <Shift
          summaryErrors={[]}
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
        />
      );

      expect(screen.getByText(`08:00 to 16:00`)).toBeTruthy();

      act(() => {
        const changeButton = screen.getByTestId('hours-change-button');
        fireEvent.click(changeButton);
      });

      await waitFor(() => {
        expect(screen.queryByText('08:00 to 16:00')).toBeFalsy();
        expect(screen.queryByText('08:00 to 16:00 on 31 October')).toBeFalsy();
      });
    });
  });
});
