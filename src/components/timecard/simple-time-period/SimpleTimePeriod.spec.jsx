import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithTimecardContext } from '../../../test/helpers/TimecardContext';
import SimpleTimePeriod from './SimpleTimePeriod';

const timecardDate = '2022-09-01';
const timecardDateNextDay = '2022-09-02';
const midnight = '00:00';

const newTimeEntry = {
  timeEntryId: '',
  timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
  startTime: '',
  finishTime: '',
};

const existingTimeEntry = {
  timeEntryId: 'id',
  timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
  startTime: midnight,
  finishTime: midnight,
};

const timePeriodTitleSWD = 'Scheduled rest day';

jest.mock('../../../api/services/timecardService', () => ({
  createTimeEntry: jest.fn().mockResolvedValue({
    data: {
      items: [
        {
          id: '7f000001-8340-1495-8183-416288370009',
          tenantId: '00000000-0000-0000-0000-000000000000',
          ownerId: 1,
          timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
          actualStartTime: '2022-09-01T00:00:00+00:00',
          actualEndTime: '2022-09-01T00:00:00+00:00',
        },
      ],
    },
  }),
  deleteTimeEntry: jest.fn().mockResolvedValue({ status: 200 }),
}));

describe('SimpleTimePeriod', () => {
  it('should display the correct time period type', () => {
    renderWithTimecardContext(
      <SimpleTimePeriod
        timeEntry={newTimeEntry}
        timeEntriesIndex={0}
        timePeriodTitle={timePeriodTitleSWD}
      />
    );

    const title = screen.getByText('Scheduled rest day');
    expect(title).toBeTruthy();
  });

  it('should display the save and cancel buttons when there is no time entry', () => {
    renderWithTimecardContext(
      <SimpleTimePeriod
        timeEntry={newTimeEntry}
        timeEntriesIndex={0}
        timePeriodTitle={timePeriodTitleSWD}
      />
    );

    const saveButton = screen.getByText('Save');
    const cancelButton = screen.getByText('Cancel');

    expect(saveButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

  it('should not display the save and cancel buttons when there is a time entry', () => {
    renderWithTimecardContext(
      <SimpleTimePeriod
        timeEntry={existingTimeEntry}
        timeEntriesIndex={1}
        timePeriodTitle={timePeriodTitleSWD}
      />
    );

    const saveButton = screen.queryByText('Save');
    const cancelButton = screen.queryByText('Cancel');

    expect(saveButton).toBeFalsy();
    expect(cancelButton).toBeFalsy();
  });

  describe('Save button', () => {
    it('should call createTimeEntry when pressing save', async () => {
      const expectedActualStartTime = `${timecardDate}T00:00:00+00:00`;
      const expectedActualEndTime = `${timecardDateNextDay}T00:00:00+00:00`;

      const timecardService = require('../../../api/services/timecardService');
      const mockCreateTimeEntry = jest.spyOn(
        timecardService,
        'createTimeEntry'
      );

      renderWithTimecardContext(
        <SimpleTimePeriod
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
        />,
        {
          timeEntries: [newTimeEntry],
          setTimeEntries: jest.fn(),
          timecardDate,
        }
      );

      act(() => {
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockCreateTimeEntry).toHaveBeenCalledWith(
          {
            ownerId: 1,
            timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
            actualStartTime: expectedActualStartTime,
            actualEndTime: expectedActualEndTime,
          },
          new URLSearchParams([
            ['tenantId', '00000000-0000-0000-0000-000000000000'],
          ])
        );
      });
    });

    it('should update timecard context when pressing "Save" button', async () => {
      const mockSetTimeEntries = jest.fn();
      renderWithTimecardContext(
        <SimpleTimePeriod
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
        />,
        {
          timeEntries: [newTimeEntry],
          setTimeEntries: mockSetTimeEntries,
        }
      );

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockSetTimeEntries).toHaveBeenCalledWith([
          {
            timeEntryId: '7f000001-8340-1495-8183-416288370009',
            startTime: midnight,
            finishTime: midnight,
            timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
          },
        ]);
      });
    });
  });

  describe('Cancel button', () => {
    it('should delete time entry when clicking the "Cancel" button', async () => {
      const mockSetTimeEntries = jest.fn();

      renderWithTimecardContext(
        <SimpleTimePeriod
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
        />,
        {
          summaryErrors: {},
          setSummaryErrors: jest.fn(),
          timeEntries: [newTimeEntry],
          setTimeEntries: mockSetTimeEntries,
          timecardDate: '2022-09-01',
          setTimecardDate: jest.fn(),
        }
      );

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(mockSetTimeEntries).toHaveBeenCalledWith([]);
    });

    it('should delete time entry when clicking the "Cancel" button with multiple time entries', async () => {
      const mockSetTimeEntries = jest.fn();

      renderWithTimecardContext(
        <SimpleTimePeriod
          timeEntry={newTimeEntry}
          timeEntriesIndex={1}
          timePeriodTitle={timePeriodTitleSWD}
        />,
        {
          summaryErrors: {},
          setSummaryErrors: jest.fn(),
          timeEntries: [existingTimeEntry, newTimeEntry],
          setTimeEntries: mockSetTimeEntries,
          timecardDate: '2022-09-01',
          setTimecardDate: jest.fn(),
        }
      );

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(mockSetTimeEntries).toHaveBeenCalledWith([existingTimeEntry]);
    });
  });

  describe('Remove button', () => {
    it('should delete time entry when clicking the "Remove" button', async () => {
      const mockSetTimeEntries = jest.fn();

      renderWithTimecardContext(
        <SimpleTimePeriod
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
        />,
        {
          timeEntries: [existingTimeEntry],
          setTimeEntries: mockSetTimeEntries,
          timecardDate: '2022-09-01',
          setTimecardDate: jest.fn(),
        }
      );

      const removeButton = screen.getByText('Remove');
      fireEvent.click(removeButton);

      await waitFor(() => {
        expect(mockSetTimeEntries).toHaveBeenCalledWith([]);
      });
    });

    it('should not delete time entry when clicking the "Remove" button if deleteTimeEntry errors', async () => {
      jest.mock('../../../api/services/timecardService', () => ({
        deleteTimeEntry: jest.fn().mockResolvedValue({ status: 404 }),
      }));

      const mockSetTimeEntries = jest.fn();
      renderWithTimecardContext(
        <SimpleTimePeriod
          timeEntry={existingTimeEntry}
          timeEntriesIndex={1}
          timePeriodTitle={timePeriodTitleSWD}
        />,
        {
          timeEntries: [existingTimeEntry],
          setTimeEntries: mockSetTimeEntries,
          timecardDate: '2022-09-01',
          setTimecardDate: jest.fn(),
        }
      );

      const removeButton = screen.getByText('Remove');
      fireEvent.click(removeButton);

      await waitFor(() => {
        expect(mockSetTimeEntries).not.toHaveBeenCalled();
      });
    });

    it('should not render the "Remove" button if time entry does not exist', () => {
      renderWithTimecardContext(
        <SimpleTimePeriod
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
        />,
        {
          timeEntries: [newTimeEntry],
        }
      );

      const removeButton = screen.queryByText('Remove');
      expect(removeButton).toBeFalsy();
    });

    it('should render the "Remove" button if time entry exists', () => {
      renderWithTimecardContext(
        <SimpleTimePeriod
          timeEntry={existingTimeEntry}
          timeEntriesIndex={1}
          timePeriodTitle={timePeriodTitleSWD}
        />,
        {
          timeEntries: [existingTimeEntry],
        }
      );

      const removeButton = screen.getByText('Remove');
      expect(removeButton).toBeTruthy();
    });
  });
});
