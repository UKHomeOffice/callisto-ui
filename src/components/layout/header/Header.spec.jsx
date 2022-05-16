import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/Helpers';

import Header from './Header';

describe('Header component', () => {
  const authClientStub = createAuthClientStub();

  it('should link to /home when pressing the Home button', () => {
    renderWithProviders(<Header />, authClientStub);
    const homeButton = screen.getByRole('link', { name: 'Home' });
    expect(homeButton.getAttribute('href')).toBe('/');
  });

  it('should link to /timecard when pressing the Timecard button', () => {
    renderWithProviders(<Header />, authClientStub);
    const timecardButton = screen.getByRole('link', { name: 'Timecard' });
    expect(timecardButton.getAttribute('href')).toBe('/timecard');
  });

  function createAuthClientStub() {
    return {
      init: jest.fn().mockResolvedValue(true),
      createLogoutUrl: jest.fn(),
      createLoginUrl: jest.fn(),
    };
  }
});
