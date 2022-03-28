import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackLink from './BackLink';

test('link is showing on page', () => {
  render(<BackLink text="Back to my calendar" />);

  const link = screen.getByText('Back to my calendar');
  expect(link).toBeInTheDocument();
});
