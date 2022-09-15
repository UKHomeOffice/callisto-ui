import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithTimecardContext } from '../../../test/helpers/TimecardContext';
import ScheduledRestDay from './ScheduledRestDay';

const timecardDate = '2022-09-01';
const timecardDateNextDay = '2022-09-02';
const newTimeEntry = {
  timeEntryId: '',
  timePeriodType: 'Scheduled rest day',
  timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
  startTime: '',
  finishTime: '',
};

const existingTimeEntry = {
  timeEntryId: 'id',
  timePeriodType: 'Scheduled rest day',
  timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
  startTime: '00:00',
  finishTime: '00:00',
};

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
}));

describe('ScheduledRestDay', () => {
  it('should display the correct time period type', () => {
    renderWithTimecardContext(
      <ScheduledRestDay timeEntry={newTimeEntry} timeEntriesIndex={0} />
    );

    const title = screen.getByText('Scheduled rest day');
    expect(title).toBeTruthy();
  });

  it('should display the save and cancel buttons when there is no time entry', () => {
    renderWithTimecardContext(
      <ScheduledRestDay timeEntry={newTimeEntry} timeEntriesIndex={0} />
    );

    const saveButton = screen.getByText('Save');
    const cancelButton = screen.getByText('Cancel');

    expect(saveButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

  it('should not display the save and cancel buttons when there is a time entry', () => {
    renderWithTimecardContext(
      <ScheduledRestDay timeEntry={existingTimeEntry} timeEntriesIndex={0} />
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
        <ScheduledRestDay timeEntry={newTimeEntry} timeEntriesIndex={0} />,
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
        <ScheduledRestDay timeEntry={newTimeEntry} timeEntriesIndex={0} />,
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
            timePeriodType: 'Scheduled rest day',
            startTime: '00:00',
            finishTime: '00:00',
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
        <ScheduledRestDay
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
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
        <ScheduledRestDay
          timeEntry={newTimeEntry}
          timeEntriesIndex={1}
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
});
