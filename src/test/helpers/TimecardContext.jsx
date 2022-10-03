import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { TimecardContext } from '../../context/TimecardContext';
import { ApplicationContext } from '../../context/ApplicationContext';
import { timeCardPeriodTypes } from '../../../mocks/mockData';

export const renderWithTimecardContext = (
  Component,
  timecardContextValues = defaultTimecardContext,
  applicationContextValues = defaultApplicationContext
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

export const defaultTimecardContext = {
  summaryErrors: {},
  setSummaryErrors: jest.fn(),
  timeEntries: [],
  setTimeEntries: jest.fn(),
  timecardDate: '',
  setTimecardDate: jest.fn(),
  newTimeEntry: false,
  setNewTimeEntry: jest.fn(),
};

export const defaultApplicationContext = {
  timePeriodTypes: timeCardPeriodTypes,
  setTimePeriodTypes: jest.fn(),
  serviceError: false,
  setServiceError: jest.fn(),
};
