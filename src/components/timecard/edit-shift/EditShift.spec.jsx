import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import {
  createDefaultTimecardContext,
  defaultApplicationContext,
  defaultTimecardContext,
  renderWithTimecardContext,
} from '../../../test/helpers/TimecardContext';
import EditShiftHours from './EditShift';
import {
  createTimeEntry,
  updateTimeEntry,
} from '../../../api/services/timecardService';
import { getApiResponseWithItems } from '../../../../mocks/mock-utils';
import {
  shiftTimeEntry,
  shiftTimeEntryWithoutFinishTime,
} from '../../../../mocks/mockData';
import { expectNeverToHappen } from '../../../test/helpers/Helpers';
import { deepCloneJson } from '../../../utils/common-utils/common-utils';

import { clashingProperties, inputNames } from '../../../utils/constants';
import { testInputNames } from '../../../utils/test-utils/testConstants';

const newTimeEntry = {
  timeEntryId: '',
  startTime: '',
  finishTime: '',
  timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
  finishNextDay: false,
};

const timecardService = require('../../../api/services/timecardService');
const mockCreateTimeEntry = jest.spyOn(timecardService, 'createTimeEntry');
const mockUpdateTimeEntry = jest.spyOn(timecardService, 'updateTimeEntry');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const invalidTimes = [
  '-00:01',
  '24:00',
  'abcd',
  '!',
  '25',
  '13am',
  '24pm',
  '3p',
  '6m',
  '7a',
  '4am',
  '5pm',
];

const validTimes = ['00:00', '08:00', '23:59', '04:26', '0000', '0', '8', '23'];

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
        const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
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

      const existingTimeEntry = {
        ...newTimeEntry,
        timeEntryId: timeEntryId,
        startTime: '2022-09-01 01:00:00+00:00',
        finishTime: '2022-09-01 05:00:00+00:00',
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
        const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
        fireEvent.change(startTimeInput, {
          target: { value: '09:00' },
        });

        const endTimeInput = screen.getByTestId(inputNames.shiftFinishTime);
        fireEvent.change(endTimeInput, {
          target: { value: '16:00' },
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
            actualStartTime: '2022-09-01T09:00:00+00:00',
            actualEndTime: '2022-09-01T16:00:00+00:00',
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
          const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
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
          const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
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

    const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
    const finishTimeInput = screen.getByTestId(inputNames.shiftFinishTime);

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

    const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
    fireEvent.change(startTimeInput, { target: { value: '12:00' } });

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
        'Enter a start time in the 24 hour clock format, for example, 08:00 or 0800'
      );
      expect(errorMessage).toBeTruthy();
    });
  });

  test.each(invalidTimes)(
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
        const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
        fireEvent.change(startTimeInput, { target: { value: testValue } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        const errorMessage = screen.getByText(
          'Enter a start time in the 24 hour clock format, for example, 08:00 or 0800'
        );
        expect(errorMessage).toBeTruthy();
      });
    }
  );

  test.each(validTimes)(
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
        const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
        fireEvent.change(startTimeInput, { target: { value: testValue } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await expectNeverToHappen(() => {
        expect(
          screen.getByText(
            'Enter a start time in the 24 hour clock format, for example, 08:00 or 0800'
          )
        ).toBeInTheDocument();
      });
    }
  );

  test.each(invalidTimes)(
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
        const finishTimeInput = screen.getByTestId(inputNames.shiftFinishTime);
        fireEvent.change(finishTimeInput, { target: { value: testValue } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        const errorMessage = screen.getByText(
          'Enter a finish time in the 24 hour clock format, for example, 08:00 or 0800'
        );
        expect(errorMessage).toBeTruthy();
      });
    }
  );

  test.each(validTimes)(
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
        const finishTimeInput = screen.getByTestId(inputNames.shiftFinishTime);
        fireEvent.change(finishTimeInput, { target: { value: testValue } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await expectNeverToHappen(() => {
        expect(
          screen.getByText(
            'Enter a finish time in the 24 hour clock format, for example, 08:00 or 0800'
          )
        ).toBeInTheDocument();
      });
    }
  );

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
      startTime: '2022-09-01 08:00:00+00:00',
      finishTime: '2022-09-01 10:00:00+00:00',
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
      const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
      fireEvent.change(startTimeInput, {
        target: { value: '08:00' },
      });

      const endTimeInput = screen.getByTestId(inputNames.shiftFinishTime);
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

  it('should show "finishes next day" when finish time is edited to less than start time', async () => {
    const timeEntryId = '1';
    const timecardDate = '2022-09-01';

    const existingTimeEntry = {
      ...newTimeEntry,
      timeEntryId: timeEntryId,
      startTime: '08:00',
      finishTime: '10:00',
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
      const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
      fireEvent.change(startTimeInput, {
        target: { value: '08:00' },
      });

      const endTimeInput = screen.getByTestId(inputNames.shiftFinishTime);
      fireEvent.change(endTimeInput, {
        target: { value: '01:00' },
      });
    });

    const message = screen.getByText('Finishes next day');
    expect(message).toBeTruthy();
  });

  describe('Dates and checkbox', () => {
    it('should show start and end dates when checking box', async () => {
      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />,
        defaultTimecardContext
      );

      act(() => {
        const checkBox = screen.getByText('View or edit dates');
        fireEvent.click(checkBox);
      });

      const startDay = screen.getByTestId(testInputNames.startDay);
      const startDayValue = startDay.getAttribute('value');
      expect(startDayValue).toEqual('01');
      const startMonth = screen.getByTestId(testInputNames.startMonth);
      const startMonthValue = startMonth.getAttribute('value');
      expect(startMonthValue).toEqual('09');
      const startYear = screen.getByTestId(testInputNames.startYear);
      const startYearValue = startYear.getAttribute('value');
      expect(startYearValue).toEqual('2022');

      const endDay = screen.getByTestId(testInputNames.endDay);
      const endDayValue = endDay.getAttribute('value');
      expect(endDayValue).toEqual('01');
      const endMonth = screen.getByTestId(testInputNames.endMonth);
      const endMonthValue = endMonth.getAttribute('value');
      expect(endMonthValue).toEqual('09');
      const endYear = screen.getByTestId(testInputNames.endYear);
      const endYearValue = endYear.getAttribute('value');
      expect(endYearValue).toEqual('2022');
    });

    it('should save successfully when the check box is ticked and save selected', async () => {
      const timeEntryId = '1';
      const timecardDate = '2022-09-02';

      const existingTimeEntry = {
        ...newTimeEntry,
        timeEntryId: timeEntryId,
        startTime: '2022-09-02 08:00:00+00:00',
        finishTime: '2022-09-02 16:00:00+00:00',
        finishNextDay: false,
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
        const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
        fireEvent.change(startTimeInput, {
          target: { value: '08:00' },
        });

        const endTimeInput = screen.getByTestId(inputNames.shiftFinishTime);
        fireEvent.change(endTimeInput, {
          target: { value: '16:00' },
        });

        const checkBox = screen.getByText('View or edit dates');
        fireEvent.click(checkBox);

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockUpdateTimeEntry).toHaveBeenCalledWith(
          timeEntryId,
          {
            ownerId: 'c6ede784-b5fc-4c95-b550-2c51cc72f1f6',
            timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
            actualStartTime: '2022-09-02T08:00:00+00:00',
            actualEndTime: '2022-09-02T16:00:00+00:00',
          },
          new URLSearchParams([
            ['tenantId', '00000000-0000-0000-0000-000000000000'],
          ])
        );
      });
    });

    it('should update finish date when the finish date box is changed and save selected', async () => {
      const timeEntryId = '1';
      const timecardDate = '2022-09-01';

      const existingTimeEntry = {
        ...newTimeEntry,
        timeEntryId: timeEntryId,
        startTime: '2022-09-01 08:00:00+00:00',
        finishTime: '2022-09-01 16:00:00+00:00',
        finishNextDay: false,
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
        const checkBox = screen.getByText('View or edit dates');
        fireEvent.click(checkBox);

        const endDay = screen.getByTestId(testInputNames.endDay);
        fireEvent.change(endDay, {
          target: { value: '02' },
        });
        fireEvent.focusOut(endDay);

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockUpdateTimeEntry).toHaveBeenCalledWith(
          timeEntryId,
          {
            ownerId: 'c6ede784-b5fc-4c95-b550-2c51cc72f1f6',
            timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
            actualStartTime: '2022-09-01T08:00:00+00:00',
            actualEndTime: '2022-09-02T16:00:00+00:00',
          },
          new URLSearchParams([
            ['tenantId', '00000000-0000-0000-0000-000000000000'],
          ])
        );
      });
    });

    it('end date should move to next day when check box is selected and finishNextDay is true', async () => {
      const timeEntryId = '1';
      const timecardDate = '2022-09-02';

      const existingTimeEntry = {
        ...newTimeEntry,
        timeEntryId: timeEntryId,
        startTime: '2022-09-02 08:00:00+00:00',
        finishTime: '2022-09-02 16:00:00+00:00',
        finishNextDay: true,
      };

      defaultTimecardContext.timecardDate = timecardDate;

      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
          localStartDate={'2022-09-02 08:00:00+00:00'}
          localEndDate={'2022-09-02 16:00:00+00:00'}
          startEntryExists={true}
          setSummaryMessages={jest.fn()}
        />,
        defaultTimecardContext
      );

      act(() => {
        const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
        fireEvent.change(startTimeInput, {
          target: { value: '08:00' },
        });

        const endTimeInput = screen.getByTestId(inputNames.shiftFinishTime);
        fireEvent.change(endTimeInput, {
          target: { value: '01:00' },
        });

        const checkBox = screen.getByText('View or edit dates');
        fireEvent.click(checkBox);

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockUpdateTimeEntry).toHaveBeenCalledWith(
          timeEntryId,
          {
            ownerId: 'c6ede784-b5fc-4c95-b550-2c51cc72f1f6',
            timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
            actualStartTime: '2022-09-02T08:00:00+00:00',
            actualEndTime: '2022-09-03T01:00:00+00:00',
          },
          new URLSearchParams([
            ['tenantId', '00000000-0000-0000-0000-000000000000'],
          ])
        );
      });
    });

    it('start date should move to previous day when check box is selected and date changed', async () => {
      const timeEntryId = '1';
      const timecardDate = '2022-09-02';

      const existingTimeEntry = {
        ...newTimeEntry,
        timeEntryId: timeEntryId,
        startTime: '2022-09-02 08:00:00+00:00',
        finishTime: '2022-09-02 16:00:00+00:00',
        finishNextDay: false,
      };

      defaultTimecardContext.timecardDate = timecardDate;

      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
          localStartDate={'2022-09-02 08:00:00+00:00'}
          localEndDate={'2022-09-02 16:00:00+00:00'}
          startEntryExists={true}
          setSummaryMessages={jest.fn()}
        />,
        defaultTimecardContext
      );

      act(() => {
        const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
        fireEvent.change(startTimeInput, {
          target: { value: '23:00' },
        });

        const checkBox = screen.getByText('View or edit dates');
        fireEvent.click(checkBox);

        const startDay = screen.getByTestId(testInputNames.startDay);
        fireEvent.change(startDay, {
          target: { value: '01' },
        });
        fireEvent.focusOut(startDay);

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockUpdateTimeEntry).toHaveBeenCalledWith(
          timeEntryId,
          {
            ownerId: 'c6ede784-b5fc-4c95-b550-2c51cc72f1f6',
            timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
            actualStartTime: '2022-09-01T23:00:00+00:00',
            actualEndTime: '2022-09-02T16:00:00+00:00',
          },
          new URLSearchParams([
            ['tenantId', '00000000-0000-0000-0000-000000000000'],
          ])
        );
      });
    });

    it('start date should move to to same day as end date when check box is selected and date changed', async () => {
      const timeEntryId = '1';
      const timecardDate = '2022-09-02';

      const existingTimeEntry = {
        ...newTimeEntry,
        timeEntryId: timeEntryId,
        startTime: '2022-09-01 23:00:00+00:00',
        finishTime: '2022-09-02 16:00:00+00:00',
        finishNextDay: false,
      };

      defaultTimecardContext.timecardDate = timecardDate;

      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={existingTimeEntry}
          timeEntriesIndex={0}
          localStartDate={'2022-09-01 23:00:00+00:00'}
          localEndDate={'2022-09-02 16:00:00+00:00'}
          startEntryExists={true}
          setSummaryMessages={jest.fn()}
        />,
        defaultTimecardContext
      );

      act(() => {
        const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
        fireEvent.change(startTimeInput, {
          target: { value: '01:00' },
        });

        const checkBox = screen.getByText('View or edit dates');
        fireEvent.click(checkBox);

        const startDay = screen.getByTestId(testInputNames.startDay);
        fireEvent.change(startDay, {
          target: { value: '02' },
        });
        fireEvent.focusOut(startDay);

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockUpdateTimeEntry).toHaveBeenCalledWith(
          timeEntryId,
          {
            ownerId: 'c6ede784-b5fc-4c95-b550-2c51cc72f1f6',
            timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
            actualStartTime: '2022-09-02T01:00:00+00:00',
            actualEndTime: '2022-09-02T16:00:00+00:00',
          },
          new URLSearchParams([
            ['tenantId', '00000000-0000-0000-0000-000000000000'],
          ])
        );
      });
    });

    describe('setMessages', () => {
      it('should set summary messages when dates have moved from the timecard date to the next day', async () => {
        updateTimeEntry.mockResolvedValue({
          data: getApiResponseWithItems(shiftTimeEntry),
        });

        const timeEntryId = '1';
        const existingTimeEntry = {
          ...newTimeEntry,
          timeEntryId: timeEntryId,
          startTime: '2022-09-01 08:00:00+00:00',
          finishTime: '2022-09-01 16:00:00+00:00',
          finishNextDay: false,
        };

        const defaultTimecardContext = createDefaultTimecardContext();
        defaultTimecardContext.setSummaryMessages = jest.fn();

        renderWithTimecardContext(
          <EditShiftHours
            setShowEditShiftHours={jest.fn()}
            timeEntry={existingTimeEntry}
            timeEntriesIndex={0}
            hasShiftMovedCallback={jest.fn()}
          />,
          defaultTimecardContext
        );

        act(() => {
          const checkBox = screen.getByText('View or edit dates');
          fireEvent.click(checkBox);

          const startDay = screen.getByTestId(testInputNames.startDay);
          fireEvent.change(startDay, {
            target: { value: '02' },
          });

          const endDay = screen.getByTestId(testInputNames.endDay);
          fireEvent.change(endDay, {
            target: { value: '02' },
          });
          fireEvent.focusOut(endDay);

          const saveButton = screen.getByText('Save');
          fireEvent.click(saveButton);
        });

        await waitFor(() => {
          expect(
            defaultTimecardContext.setSummaryMessages
          ).toHaveBeenCalledWith({
            update: {
              template: 'datesMoved',
              variables: { startDate: '2022-09-02', endDate: '2022-09-02' },
            },
          });
        });
      });

      it('should set summary messages without finish date when dates have moved and finish entry does not exist', async () => {
        updateTimeEntry.mockResolvedValue({
          data: getApiResponseWithItems(shiftTimeEntry),
        });

        const timeEntryId = '1';
        const existingTimeEntry = {
          ...newTimeEntry,
          timeEntryId: timeEntryId,
          startTime: '2022-09-01 08:00:00+00:00',
          finishTime: '',
          finishNextDay: false,
        };

        const defaultTimecardContext = createDefaultTimecardContext();
        defaultTimecardContext.setSummaryMessages = jest.fn();

        renderWithTimecardContext(
          <EditShiftHours
            setShowEditShiftHours={jest.fn()}
            timeEntry={existingTimeEntry}
            timeEntriesIndex={0}
            hasShiftMovedCallback={jest.fn()}
          />,
          defaultTimecardContext
        );

        act(() => {
          const checkBox = screen.getByText('View or edit dates');
          fireEvent.click(checkBox);

          const startDay = screen.getByTestId(testInputNames.startDay);
          fireEvent.change(startDay, {
            target: { value: '02' },
          });
          fireEvent.focusOut(startDay);

          const saveButton = screen.getByText('Save');
          fireEvent.click(saveButton);
        });

        await waitFor(() => {
          expect(
            defaultTimecardContext.setSummaryMessages
          ).toHaveBeenCalledWith({
            update: {
              template: 'datesMoved',
              variables: { startDate: '2022-09-02' },
            },
          });
        });
      });

      it('should not set summary messages for new time entries', async () => {
        createTimeEntry.mockResolvedValue({
          data: getApiResponseWithItems(shiftTimeEntry),
        });

        const defaultTimecardContext = createDefaultTimecardContext();
        defaultTimecardContext.setSummaryMessages = jest.fn();

        renderWithTimecardContext(
          <EditShiftHours
            setShowEditShiftHours={jest.fn()}
            timeEntry={newTimeEntry}
            timeEntriesIndex={0}
          />,
          defaultTimecardContext
        );

        act(() => {
          const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
          fireEvent.change(startTimeInput, { target: { value: '08:00' } });

          const saveButton = screen.getByText('Save');
          fireEvent.click(saveButton);
        });

        await waitFor(() => {
          expect(
            defaultTimecardContext.setSummaryMessages
          ).not.toHaveBeenCalled();
        });
      });
    });
  });

  it('Should display an error when start time is forced after end time', async () => {
    const timeEntryId = '1';
    const timecardDate = '2022-09-02';

    const existingTimeEntry = {
      ...newTimeEntry,
      timeEntryId: timeEntryId,
      startTime: '2022-09-02 08:00:00+00:00',
      finishTime: '2022-09-02 16:00:00+00:00',
      finishNextDay: false,
    };

    defaultTimecardContext.timecardDate = timecardDate;

    renderWithTimecardContext(
      <EditShiftHours
        setShowEditShiftHours={jest.fn()}
        timeEntry={existingTimeEntry}
        timeEntriesIndex={0}
        localStartDate={'2022-09-02 08:00:00+00:00'}
        localEndDate={'2022-09-02 16:00:00+00:00'}
        startEntryExists={true}
        setSummaryMessages={jest.fn()}
      />,
      defaultTimecardContext
    );

    act(() => {
      const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
      fireEvent.change(startTimeInput, {
        target: { value: '23:00' },
      });

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(defaultTimecardContext.setSummaryErrors).toHaveBeenCalledWith({
        [inputNames.shiftStartTime]: {
          message: 'Start time must be before end time',
        },
      });
    });
  });

  describe('Service errors', () => {
    it('should set time entry clashing errors in summaryErrors when error is returned from the server for start and end time', async () => {
      createTimeEntry.mockImplementation(() => {
        throw {
          response: {
            data: [
              {
                field: clashingProperties.startAndEndTime,
                data: [
                  {
                    timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
                    startTime: null,
                    endTime: null,
                  },
                ],
              },
            ],
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

      const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
      const finishTimeInput = screen.getByTestId(inputNames.shiftFinishTime);

      fireEvent.change(startTimeInput, { target: { value: '1201' } });
      fireEvent.change(finishTimeInput, { target: { value: '2201' } });

      act(() => {
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(defaultTimecardContext.setSummaryErrors).toHaveBeenCalledWith({
          [inputNames.shiftStartTime]: {
            message:
              'Your start and finish times must not overlap with another time period',
          },
        });
      });
    });

    it('should set time entry clashing errors in summaryErrors when error is returned from the server for start time', async () => {
      createTimeEntry.mockImplementation(() => {
        throw {
          response: {
            data: [
              {
                field: clashingProperties.startTime,
                data: [
                  {
                    timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
                    startTime: null,
                    endTime: null,
                  },
                ],
              },
            ],
          },
        };
      });

      const mockTimecardContext = deepCloneJson(defaultTimecardContext);
      mockTimecardContext.setSummaryErrors = jest.fn();
      mockTimecardContext.setTimeEntries = jest.fn();

      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />,
        mockTimecardContext
      );

      const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
      const finishTimeInput = screen.getByTestId(inputNames.shiftFinishTime);

      fireEvent.change(startTimeInput, { target: { value: '1201' } });
      fireEvent.change(finishTimeInput, { target: { value: '2201' } });

      act(() => {
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockTimecardContext.setSummaryErrors).toHaveBeenCalledWith({
          [inputNames.shiftStartTime]: {
            message:
              'Your start time must not overlap with another time period',
          },
        });
      });
    });

    it('should set time entry clashing errors in summaryErrors when error is returned from the server for end time', async () => {
      createTimeEntry.mockImplementation(() => {
        throw {
          response: {
            data: [
              {
                field: clashingProperties.endTime,
                data: [
                  {
                    timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
                    startTime: null,
                    endTime: null,
                  },
                ],
              },
            ],
          },
        };
      });

      const mockTimecardContext = deepCloneJson(defaultTimecardContext);
      mockTimecardContext.setSummaryErrors = jest.fn();
      mockTimecardContext.setTimeEntries = jest.fn();

      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />,
        mockTimecardContext
      );

      const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
      const finishTimeInput = screen.getByTestId(inputNames.shiftFinishTime);

      fireEvent.change(startTimeInput, { target: { value: '1201' } });
      fireEvent.change(finishTimeInput, { target: { value: '2201' } });

      act(() => {
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockTimecardContext.setSummaryErrors).toHaveBeenCalledWith({
          [inputNames.shiftFinishTime]: {
            message:
              'Your finish time must not overlap with another time period',
          },
        });
      });
    });

    it('should not set summary errors for responses other than time clashes', async () => {
      createTimeEntry.mockImplementation(() => {
        throw {
          response: {
            data: [
              {
                field: 'ownerId',
                data: [],
              },
            ],
          },
        };
      });

      const mockTimecardContext = deepCloneJson(defaultTimecardContext);
      mockTimecardContext.setSummaryErrors = jest.fn();
      mockTimecardContext.setTimeEntries = jest.fn();

      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />,
        mockTimecardContext
      );

      const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
      const finishTimeInput = screen.getByTestId(inputNames.shiftFinishTime);

      fireEvent.change(startTimeInput, { target: { value: '1201' } });
      fireEvent.change(finishTimeInput, { target: { value: '2201' } });

      act(() => {
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockTimecardContext.setSummaryErrors).not.toHaveBeenCalled();
      });
    });

    it('should not set summary errors when not all errors are time clashes', async () => {
      createTimeEntry.mockImplementation(() => {
        throw {
          response: {
            data: [
              {
                field: 'ownerId',
                data: [],
              },
              {
                field: clashingProperties.endTime,
                data: [
                  {
                    timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
                    startTime: null,
                    endTime: null,
                  },
                ],
              },
            ],
          },
        };
      });

      const mockTimecardContext = deepCloneJson(defaultTimecardContext);
      mockTimecardContext.setSummaryErrors = jest.fn();
      mockTimecardContext.setTimeEntries = jest.fn();

      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />,
        mockTimecardContext
      );

      const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
      const finishTimeInput = screen.getByTestId(inputNames.shiftFinishTime);

      fireEvent.change(startTimeInput, { target: { value: '1201' } });
      fireEvent.change(finishTimeInput, { target: { value: '2201' } });

      act(() => {
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(mockTimecardContext.setSummaryErrors).not.toHaveBeenCalled();
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

      const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
      const finishTimeInput = screen.getByTestId(inputNames.shiftFinishTime);

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

    it('should generate an error message with focus errors called', async () => {
      const focusErrors = jest.fn();
      const timeEntryId = '1';
      const timecardDate = '2022-09-01';

      const existingTimeEntry = {
        ...newTimeEntry,
        timeEntryId: timeEntryId,
        startTime: '08:00',
        finishTime: '10:00',
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
        const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
        fireEvent.change(startTimeInput, {
          target: { value: '' },
        });

        const endTimeInput = screen.getByTestId(inputNames.shiftFinishTime);
        fireEvent.change(endTimeInput, {
          target: { value: '01:00' },
        });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });
      await waitFor(() => {
        expect(focusErrors.toHaveBeenCalled);
      });
    });
  });
});
