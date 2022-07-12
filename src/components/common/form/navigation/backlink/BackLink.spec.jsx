import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackLink from './BackLink';
import { MemoryRouter } from 'react-router-dom';

describe('BackLink', () => {
  it('should render text if text prop is passed in', () => {
    render(<BackLink text="Back to my calendar" link="/calendar" />, {
      wrapper: MemoryRouter,
    });

    const text = screen.getByText('Back to my calendar');
    expect(text).toBeTruthy();
  });

  it('should default to "Back" if text prop is not passed in', () => {
    render(<BackLink link="/" />, {
      wrapper: MemoryRouter,
    });

    const text = screen.getByText('Back');
    expect(text).toBeTruthy();
  });

  it('should route to previous page when pressing back', () => {
    render(<BackLink text="Back to calendar" link="/calendar" />, {
      wrapper: MemoryRouter,
    });

    const link = screen.getByText('Back to calendar');
    expect(link.pathname).toBe('/calendar');
  });
});
