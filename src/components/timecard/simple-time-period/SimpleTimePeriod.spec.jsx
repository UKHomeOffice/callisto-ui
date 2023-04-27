import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import SimpleTimePeriod from './SimpleTimePeriod';
import {
  createTimeEntry,
  deleteTimeEntry,
} from '../../../api/services/timecardService';
import {
  renderWithApplicationContext,
  defaultApplicationContext,
} from '../../../test/helpers/TestApplicationContext';
const timecardDate = '2022-09-01';
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
          ownerId: 'c6ede784-b5fc-4c95-b550-2c51cc72f1f6',
          timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
          actualStartTime: '2022-09-01T00:00:00+00:00',
          actualEndTime: '2022-09-01T00:00:00+00:00',
        },
      ],
    },
  }),
  deleteTimeEntry: jest.fn().mockResolvedValue({ status: 200 }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const mockSetTimeEntries = jest.fn();

describe('SimpleTimePeriod', () => {
  it('should display the correct time period type', () => {
    renderWithApplicationContext(
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
    renderWithApplicationContext(
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
    renderWithApplicationContext(
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
      const expectedActualEndTime = `${timecardDate}T23:59:59+00:00`;

      const timecardService = require('../../../api/services/timecardService');
      const mockCreateTimeEntry = jest.spyOn(
        timecardService,
        'createTimeEntry'
      );

      renderWithApplicationContext(
        <SimpleTimePeriod
          timecardDate={timecardDate}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
          timeEntries={[newTimeEntry]}
          setTimeEntries={mockSetTimeEntries}
        />
      );

      act(() => {
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockCreateTimeEntry).toHaveBeenCalledWith(
          {
            ownerId: 'c6ede784-b5fc-4c95-b550-2c51cc72f1f6',
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
      renderWithApplicationContext(
        <SimpleTimePeriod
          timecardDate={timecardDate}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
          timeEntries={[newTimeEntry]}
          setTimeEntries={mockSetTimeEntries}
        />
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
            finishNextDay: false,
          },
        ]);
      });
    });

    it('should not display any service errors when submitting a time entry is successful', async () => {
      renderWithApplicationContext(
        <SimpleTimePeriod
          timecardDate={timecardDate}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
          timeEntries={[newTimeEntry]}
          setTimeEntries={mockSetTimeEntries}
        />
      );

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(defaultApplicationContext.setServiceError).toHaveBeenCalledWith({
          hasError: false,
        });
      });
    });

    it('should display an error banner when submitting a time entry is unsuccessful', async () => {
      createTimeEntry.mockImplementation(() => {
        throw Error();
      });
      renderWithApplicationContext(
        <SimpleTimePeriod
          timecardDate={timecardDate}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
          timeEntries={[newTimeEntry]}
          setTimeEntries={mockSetTimeEntries}
        />
      );

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(defaultApplicationContext.setServiceError).toHaveBeenCalledWith({
          hasError: true,
          recoverable: true,
        });
      });
    });
  });

  describe('Cancel button', () => {
    it('should delete time entry when clicking the "Cancel" button', async () => {
      renderWithApplicationContext(
        <SimpleTimePeriod
          timecardDate={'2022-09-01'}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
          timeEntries={[newTimeEntry]}
          setTimeEntries={mockSetTimeEntries}
        />
      );

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(mockSetTimeEntries).toHaveBeenCalledWith([]);
    });

    it('should delete time entry when clicking the "Cancel" button with multiple time entries', async () => {
      renderWithApplicationContext(
        <SimpleTimePeriod
          timecardDate={'2022-09-01'}
          timeEntry={newTimeEntry}
          timeEntriesIndex={1}
          timePeriodTitle={timePeriodTitleSWD}
          timeEntries={[existingTimeEntry, newTimeEntry]}
          setTimeEntries={mockSetTimeEntries}
        />
      );

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(mockSetTimeEntries).toHaveBeenCalledWith([existingTimeEntry]);
    });
  });

  describe('Remove button', () => {
    it('should delete time entry when clicking the "Remove" button', async () => {
      renderWithApplicationContext(
        <SimpleTimePeriod
          timecardDate={'2022-09-01'}
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
          timeEntries={[existingTimeEntry]}
          setTimeEntries={mockSetTimeEntries}
        />
      );

      const removeButton = screen.getByText('Remove');
      fireEvent.click(removeButton);

      await waitFor(() => {
        expect(mockSetTimeEntries).toHaveBeenCalledWith([]);
      });
    });

    it('should not display any service errors when deleting a time entry is successful', async () => {
      renderWithApplicationContext(
        <SimpleTimePeriod
          timecardDate={timecardDate}
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
          timeEntries={[existingTimeEntry]}
          setTimeEntries={mockSetTimeEntries}
        />
      );

      const removeButton = screen.getByText('Remove');
      fireEvent.click(removeButton);

      await waitFor(() => {
        expect(defaultApplicationContext.setServiceError).toHaveBeenCalledWith({
          hasError: false,
        });
      });
    });

    it('should display an error banner when clicking the "Remove" button if deleteTimeEntry errors', async () => {
      deleteTimeEntry.mockImplementation(() => {
        throw Error();
      });
      renderWithApplicationContext(
        <SimpleTimePeriod
          timecardDate={timecardDate}
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
          timeEntries={[existingTimeEntry]}
          setTimeEntries={mockSetTimeEntries}
        />
      );

      const removeButton = screen.getByText('Remove');
      fireEvent.click(removeButton);

      await waitFor(() => {
        expect(defaultApplicationContext.setServiceError).toHaveBeenCalledWith({
          hasError: true,
          recoverable: true,
        });
        expect(mockSetTimeEntries).not.toHaveBeenCalled();
      });
    });

    it('should not render the "Remove" button if time entry does not exist', () => {
      renderWithApplicationContext(
        <SimpleTimePeriod
          timecardDate={timecardDate}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
          timePeriodTitle={timePeriodTitleSWD}
          timeEntries={[newTimeEntry]}
          setTimeEntries={mockSetTimeEntries}
        />
      );

      const removeButton = screen.queryByText('Remove');
      expect(removeButton).toBeFalsy();
    });

    it('should render the "Remove" button if time entry exists', () => {
      renderWithApplicationContext(
        <SimpleTimePeriod
          timecardDate={timecardDate}
          timeEntry={existingTimeEntry}
          timeEntriesIndex={1}
          timePeriodTitle={timePeriodTitleSWD}
          timeEntries={[existingTimeEntry]}
          setTimeEntries={mockSetTimeEntries}
        />
      );

      const removeButton = screen.getByText('Remove');
      expect(removeButton).toBeTruthy();
    });
  });
});
