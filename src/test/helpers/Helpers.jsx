import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ReactKeycloakProvider } from '@react-keycloak/web';

export const renderWithProviders = (Component, AuthClientStub) =>
  render(
    <ReactKeycloakProvider authClient={AuthClientStub}>
      <BrowserRouter>{Component}</BrowserRouter>
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

export const expectNeverToHappen = async (callable, timeout = 100) => {
  await expect(waitFor(callable, { timeout })).rejects.toEqual(
    expect.anything()
  );
};
