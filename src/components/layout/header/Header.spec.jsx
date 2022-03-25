import React from 'react';
import { screen, render } from '@testing-library/react';

import Header from './Header';

describe('Header component', () => {
  it('should link to /home when pressing the Home button', () => {
    render(<Header />);

    const homeButton = screen.getByRole('link', { name: 'Home' });
    expect(homeButton.getAttribute('href')).toBe('/home');
  });

  it('should link to /timecard when pressing the Timecard button', () => {
    render(<Header />);

    const timecardButton = screen.getByRole('link', { name: 'Timecard' });
    expect(timecardButton.getAttribute('href')).toBe('/timecard');
  });
});
