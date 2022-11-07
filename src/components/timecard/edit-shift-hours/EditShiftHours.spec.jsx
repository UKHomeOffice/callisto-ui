import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import {
  defaultApplicationContext,
  defaultTimecardContext,
  renderWithTimecardContext,
} from '../../../test/helpers/TimecardContext';
import EditShiftHours from './EditShiftHours';
import {
  createTimeEntry,
  updateTimeEntry,
} from '../../../api/services/timecardService';
import { getApiResponseWithItems } from '../../../../mocks/mock-utils';
import {
  shiftTimeEntry,
  shiftTimeEntryWithoutFinishTime,
} from '../../../../mocks/mockData';

const newTimeEntry = {
  timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
  finishNextDay: false,
};

const timecardService = require('../../../api/services/timecardService');
const mockCreateTimeEntry = jest.spyOn(timecardService, 'createTimeEntry');
const mockUpdateTimeEntry = jest.spyOn(timecardService, 'updateTimeEntry');

describe('EditShiftHours', () => {
  describe('given time entries are to be persisted', () => {
    const timecardDate = '2022-09-01';
    const inputtedStartTime = '08:00';
    const expectedActualStartTime = `${timecardDate}T${inputtedStartTime}:00+00:00`;

    it('should call createTimeEntry when pressing save with no existing time entry', async () => {
      defaultTimecardContext.timecardDate = timecardDate;

      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />,
        defaultTimecardContext
      );

      act(() => {
        const startTimeInput = screen.getByTestId('shift-start-time');
        fireEvent.change(startTimeInput, {
          target: { value: inputtedStartTime },
        });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockCreateTimeEntry).toHaveBeenCalledWith(
          {
            ownerId: 'c6ede784-b5fc-4c95-b550-2c51cc72f1f6',
            timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
            actualStartTime: expectedActualStartTime,
            actualEndTime: '',
          },
          new URLSearchParams([
            ['tenantId', '00000000-0000-0000-0000-000000000000'],
          ])
        );
      });
    });

    it('should call updateTimeEntry when pressing save when there is an existing time entry', async () => {
      const timeEntryId = '1';
      const inputtedEndTime = '10:00';

      const existingTimeEntry = {
        ...newTimeEntry,
        timeEntryId: timeEntryId,
        startTime: '01:00',
        endTime: '05:00',
      };

      defaultTimecardContext.timecardDate = timecardDate;

      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
        />,
        defaultTimecardContext
      );

      act(() => {
        const startTimeInput = screen.getByTestId('shift-start-time');
        fireEvent.change(startTimeInput, {
          target: { value: inputtedStartTime },
        });

        const endTimeInput = screen.getByTestId('shift-finish-time');
        fireEvent.change(endTimeInput, {
          target: { value: inputtedEndTime },
        });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockUpdateTimeEntry).toHaveBeenCalledWith(
          timeEntryId,
          {
            ownerId: 'c6ede784-b5fc-4c95-b550-2c51cc72f1f6',
            timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
            actualStartTime: expectedActualStartTime,
            actualEndTime: `${timecardDate}T${inputtedEndTime}:00+00:00`,
          },
          new URLSearchParams([
            ['tenantId', '00000000-0000-0000-0000-000000000000'],
          ])
        );
      });
    });

    test.each([createTimeEntry, updateTimeEntry])(
      'should not display any service errors when submitting a time entry is successful',
      async (ajaxRequest) => {
        ajaxRequest.mockResolvedValue({
          data: {
            meta: {},
            items: [newTimeEntry],
          },
        });

        renderWithTimecardContext(
          <EditShiftHours
            setShowEditShiftHours={jest.fn()}
            timeEntry={newTimeEntry}
            timeEntriesIndex={0}
          />,
          defaultTimecardContext,
          defaultApplicationContext
        );

        act(() => {
          const startTimeInput = screen.getByTestId('shift-start-time');
          fireEvent.change(startTimeInput, {
            target: { value: inputtedStartTime },
          });

          const saveButton = screen.getByText('Save');
          fireEvent.click(saveButton);
        });

        await waitFor(() => {
          expect(
            defaultApplicationContext.setServiceError
          ).toHaveBeenCalledWith({
            hasError: false,
          });
        });
      }
    );

    test.each([createTimeEntry, updateTimeEntry])(
      'should display an error banner when submitting a time entry is unsuccessful',
      async (ajaxRequest) => {
        ajaxRequest.mockImplementation(() => {
          throw Error();
        });

        renderWithTimecardContext(
          <EditShiftHours
            setShowEditShiftHours={jest.fn()}
            timeEntry={newTimeEntry}
            timeEntriesIndex={0}
          />,
          defaultTimecardContext,
          defaultApplicationContext
        );

        act(() => {
          const startTimeInput = screen.getByTestId('shift-start-time');
          fireEvent.change(startTimeInput, {
            target: { value: inputtedStartTime },
          });

          const saveButton = screen.getByText('Save');
          fireEvent.click(saveButton);
        });

        await waitFor(() => {
          expect(
            defaultApplicationContext.setServiceError
          ).toHaveBeenCalledWith({
            hasError: true,
            recoverable: true,
          });
        });
      }
    );
  });

  it('should auto insert a colon in time entry using api response when clicking save on success', async () => {
    createTimeEntry.mockResolvedValue({
      data: getApiResponseWithItems(shiftTimeEntry),
    });

    renderWithTimecardContext(
      <EditShiftHours
        setShowEditShiftHours={jest.fn()}
        timeEntry={newTimeEntry}
        timeEntriesIndex={0}
      />
    );

    const startTimeInput = screen.getByTestId('shift-start-time');
    const finishTimeInput = screen.getByTestId('shift-finish-time');

    fireEvent.change(startTimeInput, { target: { value: '1201' } });
    fireEvent.change(finishTimeInput, { target: { value: '2201' } });

    act(() => {
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(defaultTimecardContext.setTimeEntries).toHaveBeenCalledWith([
        {
          startTime: shiftTimeEntry.actualStartTime,
          finishTime: shiftTimeEntry.actualEndTime,
          timeEntryId: 'c0a80040-82cf-1986-8182-cfedbbd50003',
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          finishNextDay: false,
        },
      ]);
    });
  });

  it('should set a blank finish time in timecard context if finish time is not entered', async () => {
    createTimeEntry.mockResolvedValue({
      data: getApiResponseWithItems(shiftTimeEntryWithoutFinishTime),
    });

    renderWithTimecardContext(
      <EditShiftHours
        setShowEditShiftHours={jest.fn()}
        timeEntry={newTimeEntry}
        timeEntriesIndex={0}
      />
    );

    const startTimeInput = screen.getByTestId('shift-start-time');
    fireEvent.change(startTimeInput, { target: { value: '1201' } });

    act(() => {
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(defaultTimecardContext.setTimeEntries).toHaveBeenCalledWith([
        {
          startTime: shiftTimeEntryWithoutFinishTime.actualStartTime,
          finishTime: '',
          timeEntryId: 'c0a80040-82cf-1986-8182-cfedbbd50004',
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          finishNextDay: false,
        },
      ]);
    });
  });

  it('should display an error when pressing save with no start time added', async () => {
    renderWithTimecardContext(
      <EditShiftHours
        setShowEditShiftHours={jest.fn()}
        timeEntry={newTimeEntry}
        timeEntriesIndex={0}
      />
    );

    act(() => {
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      const errorMessage = screen.getByText(
        'You must enter a start time in the HH:MM 24 hour clock format'
      );
      expect(errorMessage).toBeTruthy();
    });
  });

  test.each(['8:00', '-00:01', '24:00', 'abcd', '!'])(
    'should display an error when pressing save with an invalid start time',
    async (testValue) => {
      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />
      );

      act(() => {
        const startTimeInput = screen.getByTestId('shift-start-time');
        fireEvent.change(startTimeInput, { target: { value: testValue } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        const errorMessage = screen.getByText(
          'You must enter a start time in the HH:MM 24 hour clock format'
        );
        expect(errorMessage).toBeTruthy();
      });
    }
  );

  test.each(['00:00', '08:00', '23:59', '04:26', '0000'])(
    'should not display an error when pressing save with a valid start time',
    async (testValue) => {
      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />
      );

      act(() => {
        const startTimeInput = screen.getByTestId('shift-start-time');
        fireEvent.change(startTimeInput, { target: { value: testValue } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        const errorMessage = screen.queryByText(
          'You must enter a start time in the HH:MM 24 hour clock format'
        );
        expect(errorMessage).toBeFalsy();
      });
    }
  );

  test.each(['8:00', '-00:01', '24:00', 'abcd', '!'])(
    'should display an error when pressing save with an invalid finish time',
    async (testValue) => {
      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />
      );

      act(() => {
        const finishTimeInput = screen.getByTestId('shift-finish-time');
        fireEvent.change(finishTimeInput, { target: { value: testValue } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        const errorMessage = screen.getByText(
          'You must enter a finish time in the HH:MM 24 hour clock format'
        );
        expect(errorMessage).toBeTruthy();
      });
    }
  );

  test.each(['00:00', '08:00', '23:59', '04:26', '0000'])(
    'should not display an error when pressing save with a valid finish time',
    async (testValue) => {
      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />
      );

      act(() => {
        const finishTimeInput = screen.getByTestId('shift-finish-time');
        fireEvent.change(finishTimeInput, { target: { value: testValue } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        const errorMessage = screen.queryByText(
          'You must enter a finish time in the HH:MM 24 hour clock format'
        );
        expect(errorMessage).toBeFalsy();
      });
    }
  );

  describe('Service errors', () => {
    it('should set time entry clashing errors in summaryErrors when error is returned from the server', async () => {
      createTimeEntry.mockImplementation(() => {
        throw {
          response: {
            data: {
              message:
                ' has the following error(s): Time periods must not overlap with another time period',
            },
          },
        };
      });

      defaultTimecardContext.setSummaryErrors = jest.fn();
      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />,
        defaultTimecardContext
      );

      const startTimeInput = screen.getByTestId('shift-start-time');
      const finishTimeInput = screen.getByTestId('shift-finish-time');

      fireEvent.change(startTimeInput, { target: { value: '1201' } });
      fireEvent.change(finishTimeInput, { target: { value: '2201' } });

      act(() => {
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(defaultTimecardContext.setSummaryErrors).toHaveBeenCalledWith({
          'shift-start-time': {
            message: 'Time periods must not overlap with another time period',
          },
        });
      });
    });

    it('should not set errors in summaryErrors when unhandled error is returned from the server', async () => {
      createTimeEntry.mockImplementation(() => {
        throw {
          response: {
            data: {
              message: 'Some other error',
            },
          },
        };
      });

      defaultTimecardContext.setSummaryErrors = jest.fn();
      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />,
        defaultTimecardContext
      );

      const startTimeInput = screen.getByTestId('shift-start-time');
      const finishTimeInput = screen.getByTestId('shift-finish-time');

      fireEvent.change(startTimeInput, { target: { value: '1201' } });
      fireEvent.change(finishTimeInput, { target: { value: '2201' } });

      act(() => {
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(defaultTimecardContext.setSummaryErrors).not.toHaveBeenCalled();
      });
    });

    it('should set finish date as next day when finish time is edited to less than start time', async () => {
      const timeEntryId = '1';
      const inputtedStartTime = '08:00';
      const inputtedEndTime = '01:00';
      const timecardDate = '2022-09-01';
      const endDate = '2022-09-02';
      const expectedActualStartTime = `${timecardDate}T${inputtedStartTime}:00+00:00`;
      const expectedActualEndTime = `${endDate}T${inputtedEndTime}:00+00:00`;

      const existingTimeEntry = {
        ...newTimeEntry,
        timeEntryId: timeEntryId,
        startTime: '08:00',
        endTime: '10:00',
        finishNextDay: true,
      };

      defaultTimecardContext.timecardDate = timecardDate;

      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
        />,
        defaultTimecardContext
      );

      act(() => {
        const startTimeInput = screen.getByTestId('shift-start-time');
        fireEvent.change(startTimeInput, {
          target: { value: '08:00' },
        });

        const endTimeInput = screen.getByTestId('shift-finish-time');
        fireEvent.change(endTimeInput, {
          target: { value: '01:00' },
        });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockUpdateTimeEntry).toHaveBeenCalledWith(
          timeEntryId,
          {
            ownerId: 'c6ede784-b5fc-4c95-b550-2c51cc72f1f6',
            timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
            actualStartTime: expectedActualStartTime,
            actualEndTime: expectedActualEndTime,
          },
          new URLSearchParams([
            ['tenantId', '00000000-0000-0000-0000-000000000000'],
          ])
        );
      });
    });
  });
});
