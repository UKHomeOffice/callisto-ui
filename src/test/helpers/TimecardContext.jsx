import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { TimecardContext } from '../../context/TimecardContext';

export const renderWithTimecardContext = (
  Component,
  values = {
    summaryErrors: {},
    setSummaryErrors: jest.fn(),
    timecardData: {
      startTime: '',
      finishTime: '',
    },
    setTimecardData: jest.fn(),
  }
) => {
  return {
    ...render(
      <MockTimecardProvider values={values}>
        <MemoryRouter>{Component}</MemoryRouter>
      </MockTimecardProvider>
    ),
  };
};

export const MockTimecardProvider = ({
  children,
  values = {
    summaryErrors: {},
    setSummaryErrors: jest.fn(),
    timecardData: {
      startTime: '',
      finishTime: '',
    },
    setTimecardData: jest.fn(),
  },
}) => {
  return (
    <TimecardContext.Provider value={values}>
      {children}
    </TimecardContext.Provider>
  );
};

MockTimecardProvider.propTypes = {
  children: PropTypes.element,
  values: PropTypes.shape({
    summaryErrors: PropTypes.object,
    setSummaryErrors: PropTypes.func,
    timecardData: PropTypes.shape({
      startTime: PropTypes.string,
      finishTime: PropTypes.string,
    }),
    setTimecardData: PropTypes.func,
  }),
};
