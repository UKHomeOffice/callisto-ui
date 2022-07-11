import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/Helpers';

import Header from './Header';

describe('Header component', () => {
  const authClientStub = createAuthClientStub();

  it('should link to /home when pressing the Home button', () => {
    renderWithProviders(<Header />, authClientStub);
    const homeButton = screen.getByText('Home');
    expect(homeButton.pathname).toBe('/');
  });

  it('should link to /timecard when pressing the Timecard button', () => {
    renderWithProviders(<Header />, authClientStub);
    const timecardButton = screen.getByText('Record my time');
    expect(timecardButton.pathname).toBe('/timecard');
  });

  function createAuthClientStub() {
    return {
      init: jest.fn().mockResolvedValue(true),
      createLogoutUrl: jest.fn(),
      createLoginUrl: jest.fn(),
    };
  }
});
