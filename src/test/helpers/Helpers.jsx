import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { ApplicationProvider } from '../../context/ApplicationContext';
import { TimecardProvider } from '../../context/TimecardContext';

export const renderWithProviders = (Component, AuthClientStub) =>
  render(
    <ReactKeycloakProvider authClient={AuthClientStub}>
      <BrowserRouter>
        <ApplicationProvider>
          <TimecardProvider>{Component}</TimecardProvider>
        </ApplicationProvider>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );

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
