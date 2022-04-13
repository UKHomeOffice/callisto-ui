import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/Helpers';

import SignIn from './SignIn';

describe('SignIn component', () => {
  const authClientStub = createAuthClientStub();

  it('should initialise the auth client', () => {
    renderWithProviders(<SignIn />, authClientStub);
    const spy = jest.spyOn(authClientStub, 'init');
    expect(spy).toHaveBeenCalled();
  });

  it('should have a Sign In option', () => {
    renderWithProviders(<SignIn />, authClientStub);
    const link = screen.getByText('Sign In');
    expect(link).toBeInTheDocument();
  });

  it('should have a Sign Out option', () => {
    const authenticatedClientStub = { ...authClientStub, authenticated: true };
    renderWithProviders(<SignIn />, authenticatedClientStub);

    const link = screen.getByText('Sign Out');
    expect(link).toBeInTheDocument();
    expect(authenticatedClientStub.authenticated).toBeTruthy();
  });

  function createAuthClientStub() {
    return {
      init: jest.fn().mockResolvedValue(true),
      login: jest.fn(),
      logout: jest.fn(),
      authenticated: false,
      tokenParsed: {},
      createLogoutUrl: jest.fn(),
      createLoginUrl: jest.fn(),
    };
  }
});
