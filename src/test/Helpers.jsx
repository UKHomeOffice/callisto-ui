import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { TimecardContext } from '../pages/timecard/Timecard';

export const renderWithProviders = (Component, AuthClientStub) =>
  render(
    <ReactKeycloakProvider authClient={AuthClientStub}>
      <BrowserRouter>{Component}</BrowserRouter>
    </ReactKeycloakProvider>
  );

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
      <TimecardContext.Provider value={values}>
        <MemoryRouter>{Component}</MemoryRouter>
      </TimecardContext.Provider>
    ),
  };
};

export const renderWithRouter = (
  Component,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  return {
    ...render(<BrowserRouter history={history}>{Component}</BrowserRouter>),
    history,
  };
};
