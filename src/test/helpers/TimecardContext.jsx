import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { TimecardContext } from '../../context/TimecardContext';
import { ApplicationContext } from '../../context/ApplicationContext';

export const renderWithTimecardContext = (
  Component,
  timecardContextValues = {
    summaryErrors: {},
    setSummaryErrors: jest.fn(),
    timeEntries: [],
    setTimeEntries: jest.fn(),
    timecardDate: '',
    setTimecardDate: jest.fn(),
  },

  applicationContextValues = {
    timePeriodTypes:[
        {
            "id": "00000000-0000-0000-0000-000000000001",
            "tenantId": "00000000-0000-0000-0000-000000000000",
            "name": "Shift"
        },
        {
            "id": "00000000-0000-0000-0000-000000000002",
            "tenantId": "00000000-0000-0000-0000-000000000000",
            "name": "Scheduled rest day"
        },
        {
            "id": "00000000-0000-0000-0000-000000000003",
            "tenantId": "00000000-0000-0000-0000-000000000000",
            "name": "Non-working day"
        },
        {
            "id": "00000000-0000-0000-0000-000000000004",
            "tenantId": "00000000-0000-0000-0000-000000000000",
            "name": "On call"
        },
        {
            "id": "00000000-0000-0000-0000-000000000005",
            "tenantId": "00000000-0000-0000-0000-000000000000",
            "name": "Absence"
        },
        {
            "id": "00000000-0000-0000-0000-000000000006",
            "tenantId": "00000000-0000-0000-0000-000000000000",
            "name": "Training"
        },
        {
            "id": "00000000-0000-0000-0000-000000000007",
            "tenantId": "00000000-0000-0000-0000-000000000000",
            "name": "Overtime"
        },
    ],
    setTimePeriodTypes: jest.fn()
  }
) => {
  return {
    ...render(
      <ApplicationContext.Provider value={applicationContextValues}>
        <TimecardContext.Provider value={timecardContextValues}>
          <MemoryRouter>{Component}</MemoryRouter>
        </TimecardContext.Provider>
      </ApplicationContext.Provider>
    ),
  };
};
