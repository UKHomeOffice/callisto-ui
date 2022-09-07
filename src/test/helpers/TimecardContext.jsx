import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { TimecardContext } from '../../context/TimecardContext';

export const renderWithTimecardContext = (
  Component,
  values = {
    summaryErrors: {},
    setSummaryErrors: jest.fn(),
    timeEntries: {
      timePeriodType: '',
      startTime: '',
      finishTime: '',
      startDate: '',
    },
    setTimeEntries: jest.fn(),
  }
) => {
  return {
    ...render(
      <TimecardContext.Provider value={values}>
        <MemoryRouter>{Component}</MemoryRouter>
      </TimecardContext.Provider>
    ),
  };
};
