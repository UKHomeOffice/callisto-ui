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
  timecardDate: '2022-09-01',
  setTimecardDate: jest.fn(),
  newTimeEntry: false,
  setNewTimeEntry: jest.fn(),
  summaryMessages: {},
  setSummaryMessages: jest.fn(),
  isAlertVisible: false,
  setIsAlertVisible: jest.fn(),
};

export const createDefaultTimecardContext = () => {
  return {
    summaryErrors: {},
    setSummaryErrors: jest.fn(),
    timeEntries: [],
    setTimeEntries: jest.fn(),
    timecardDate: '2022-09-01',
    setTimecardDate: jest.fn(),
    newTimeEntry: false,
    setNewTimeEntry: jest.fn(),
    summaryMessages: {},
    setSummaryMessages: jest.fn(),
    isAlertVisible: false,
    setIsAlertVisible: jest.fn(),
  };
};

export const defaultApplicationContext = {
  timePeriodTypes: timeCardPeriodTypes,
  setTimePeriodTypes: jest.fn(),
  serviceError: {
    hasError: false,
  },
  setServiceError: jest.fn(),
  userId: 'c6ede784-b5fc-4c95-b550-2c51cc72f1f6',
  setUserId: jest.fn(),
};
