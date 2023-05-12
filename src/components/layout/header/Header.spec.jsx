import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/helpers/Helpers';
import Header from './Header';

jest.mock('../../../utils/time-entry-utils/timeEntryUtils', () => ({
  formatDate: () => '2022-09-01',
}));

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
    expect(timecardButton.pathname).toBe('/timecard/2022-09-01');
  });

  it('should link to /accruals when pressing the Accruals button', () => {
    renderWithProviders(<Header />, authClientStub);
    const timecardButton = screen.getByText('Track my time');
    expect(timecardButton.pathname).toBe('/accruals/2022-09-01');
  });

  function createAuthClientStub() {
    return {
      init: jest.fn().mockResolvedValue(true),
      createLogoutUrl: jest.fn(),
      createLoginUrl: jest.fn(),
    };
  }
});
