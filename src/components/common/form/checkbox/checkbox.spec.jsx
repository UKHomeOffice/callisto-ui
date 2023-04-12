import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from './Checkbox';

test('text is showing on page', () => {
  render(
    <Checkbox
      text="Shift longer than 24 hours"
      name="shift-is-longer-than-24-hours"
      handleChange={jest.fn()}
    />
  );

  const text = screen.getByText('Shift longer than 24 hours');
  expect(text).toBeInTheDocument();
});

test('should set the checkbox to checked when it is selected', () => {
  render(
    <Checkbox
      text="Shift longer than 24 hours"
      name="shift-is-longer-than-24-hours"
      handleChange={jest.fn()}
    />
  );

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(checkbox.checked).toEqual(true);
});
