import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from './Checkbox';
import userEvent from '@testing-library/user-event';

test('text is showing on page', () => {
  render(<Checkbox text="Shift longer than 24 hours" />);

  const text = screen.getByText('Shift longer than 24 hours');
  expect(text).toBeInTheDocument();
});

test('should set the checkbox to checked when it is selected', () => {
  render(<Checkbox text="Shift longer than 24 hours" />);

  const checkbox = screen.getByRole('checkbox');
  userEvent.click(checkbox, { target: { checked: true } });
});
