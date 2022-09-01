import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { TimecardContext } from '../../context/TimecardContext';

export const renderWithTimecardContext = (
  Component,
  values = {
    summaryErrors: {},
    setSummaryErrors: jest.fn(),
    timecardData: {
      timePeriodType: '',
      startTime: '',
      finishTime: '',
      startDate: '',
      id: '',
    },
    setTimecardData: jest.fn(),
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
