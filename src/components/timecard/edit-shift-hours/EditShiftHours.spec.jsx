import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';

import {
  defaultApplicationContext,
  defaultTimecardContext,
  renderWithRealTimecardContext,
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
import { deepCloneJson } from '../../../utils/common-utils/common-utils';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../test/helpers/Helpers';

const newTimeEntry = {
  timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
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
      const mockTimecardContext = deepCloneJson(defaultTimecardContext);
      mockTimecardContext.timecardDate = timecardDate;

      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          index={0}
        />,
        mockTimecardContext
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
      const inputtedEndTime = '06:00';

      const existingTimeEntry = {
        ...newTimeEntry,
        timeEntryId: timeEntryId,
        startTime: '01:00',
        endTime: '05:00',
      };

      const mockTimecardContext = deepCloneJson(defaultTimecardContext);
      mockTimecardContext.timecardDate = timecardDate;

      renderWithTimecardContext(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={existingTimeEntry}
          index={0}
        />,
        mockTimecardContext
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
            index={0}
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
            index={0}
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

    const mockTimecardContext = deepCloneJson(defaultTimecardContext);
    mockTimecardContext.setTimeEntries = jest.fn();

    renderWithTimecardContext(
      <EditShiftHours
        setShowEditShiftHours={jest.fn()}
        timeEntry={newTimeEntry}
        timeEntriesIndex={0}
      />,
      mockTimecardContext
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
      expect(mockTimecardContext.setTimeEntries).toHaveBeenCalledWith([
        {
          startTime: '12:00',
          finishTime: '22:00',
          timeEntryId: 'c0a80040-82cf-1986-8182-cfedbbd50003',
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
        },
      ]);
    });
  });

  it('should set a blank finish time in timecard context if finish time is not entered', async () => {
    createTimeEntry.mockResolvedValue({
      data: getApiResponseWithItems(shiftTimeEntryWithoutFinishTime),
    });

    const mockTimecardContext = deepCloneJson(defaultTimecardContext);
    mockTimecardContext.setTimeEntries = jest.fn();

    renderWithTimecardContext(
      <EditShiftHours
        setShowEditShiftHours={jest.fn()}
        timeEntry={newTimeEntry}
        timeEntriesIndex={0}
      />,
      mockTimecardContext
    );

    const startTimeInput = screen.getByTestId('shift-start-time');
    fireEvent.change(startTimeInput, { target: { value: '1201' } });

    act(() => {
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(mockTimecardContext.setTimeEntries).toHaveBeenCalledWith([
        {
          startTime: '12:00',
          finishTime: '',
          timeEntryId: 'c0a80040-82cf-1986-8182-cfedbbd50004',
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
        },
      ]);
    });
  });

  it('should display an error when pressing save with no start time added', async () => {
    renderWithTimecardContext(
      <EditShiftHours
        setShowEditShiftHours={jest.fn()}
        timeEntry={newTimeEntry}
        index={0}
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
          index={0}
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
          index={0}
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
          index={0}
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
          index={0}
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
    const authClientStub = createAuthClientStub();

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

      renderWithProviders(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />,
        authClientStub
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
        screen.debug();
        const errorMessage = screen.getByText(
          'Time periods must not overlap with another time period'
        );
        expect(errorMessage).toBeTruthy();
      });
    });

    it('should not display clashing errors when unhandled error is returned from the server', async () => {
      createTimeEntry.mockImplementation(() => {
        throw {
          response: {
            data: {
              message: 'Some other error',
            },
          },
        };
      });

      renderWithProviders(
        <EditShiftHours
          setShowEditShiftHours={jest.fn()}
          timeEntry={newTimeEntry}
          timeEntriesIndex={0}
        />,
        authClientStub
      );

      const startTimeInput = screen.getByTestId('shift-start-time');
      const finishTimeInput = screen.getByTestId('shift-finish-time');

      fireEvent.change(startTimeInput, { target: { value: '1201' } });
      fireEvent.change(finishTimeInput, { target: { value: '2201' } });

      act(() => {
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      screen.debug();
      const errorMessage = screen.queryByText(
        'Time periods must not overlap with another time period'
      );
      expect(errorMessage).toBeFalsy();
    });
  });
});

function createAuthClientStub() {
  return {
    init: jest.fn().mockResolvedValue(true),
    login: jest.fn(),
    logout: jest.fn(),
    authenticated: false,
    tokenParsed: {
      personId: '65948f12-a8f3-461d-92a9-1d89ba8be9de',
      exp: 1666274108,
      iat: 1666273808,
      auth_time: 1666273808,
      jti: 'f0713673-4795-40ee-a724-a13d595cbf6a',
      iss: 'http://localhost:8080/auth/realms/callistorealm',
      aud: 'account',
      sub: '9e47cf29-1598-4269-aa31-db1d2e4e0207',
      typ: 'Bearer',
      azp: 'callistoreactclientid',
      nonce: 'faaae9ae-10f2-4845-a74f-a79af25e5d55',
      session_state: '65948f12-a8f3-461d-92a9-1d89ba8be9de',
      acr: '1',
      'allowed-origins': ['http://localhost:3000'],
      realm_access: {
        roles: [
          'offline_access',
          'default-roles-callistorealm',
          'uma_authorization',
        ],
      },
      resource_access: {
        account: {
          roles: ['manage-account', 'manage-account-links', 'view-profile'],
        },
      },
      scope: 'openid profile email',
      sid: '65948f12-a8f3-461d-92a9-1d89ba8be9de',
      email_verified: false,
      preferred_username: 'callistouser',
    },
    createLogoutUrl: jest.fn(),
    createLoginUrl: jest.fn(),
  };
}
