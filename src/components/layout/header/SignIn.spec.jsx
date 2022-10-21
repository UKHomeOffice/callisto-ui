import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/helpers/Helpers';

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
      tokenParsed: {
        "exp": 1666274108,
        "iat": 1666273808,
        "auth_time": 1666273808,
        "jti": "f0713673-4795-40ee-a724-a13d595cbf6a",
        "iss": "http://localhost:8080/auth/realms/callistorealm",
        "aud": "account",
        "sub": "9e47cf29-1598-4269-aa31-db1d2e4e0207",
        "typ": "Bearer",
        "azp": "callistoreactclientid",
        "nonce": "faaae9ae-10f2-4845-a74f-a79af25e5d55",
        "session_state": "65948f12-a8f3-461d-92a9-1d89ba8be9de",
        "acr": "1",
        "allowed-origins": [
            "http://localhost:3000"
        ],
        "realm_access": {
            "roles": [
                "offline_access",
                "default-roles-callistorealm",
                "uma_authorization"
            ]
        },
        "resource_access": {
            "account": {
                "roles": [
                    "manage-account",
                    "manage-account-links",
                    "view-profile"
                ]
            }
        },
        "scope": "openid profile email",
        "sid": "65948f12-a8f3-461d-92a9-1d89ba8be9de",
        "email_verified": false,
        "preferred_username": "callistouser"
    },
      createLogoutUrl: jest.fn(),
      createLoginUrl: jest.fn(),
    };
  }
});
