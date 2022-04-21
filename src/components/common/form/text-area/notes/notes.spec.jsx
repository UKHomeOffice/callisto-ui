import { fireEvent, render, screen } from '@testing-library/react';
import Notes from './Notes';

const setup = () => {
  const utils = render(<Notes />);
  const text = utils.getByTestId('exceeding-characters');
  return {
    text,
    ...utils,
  };
};

test('allows text to be inputted', () => {
  const { text } = setup();
  expect(text.value).toBe('');
  fireEvent.change(text, { target: { value: 'sample text' } });
  expect(text.value).toBe('sample text');
});

test('error class is present on textarea when character count exceeded', () => {
  const charactersOver =
    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortorm';

  const { text } = setup();
  expect(text.value).toBe('');
  fireEvent.change(text, { target: { value: charactersOver } });
  expect(text.value).toBe(charactersOver);
  expect(text.className).toContain('govuk-textarea--error');
});

test('should show error message when characters count is over', () => {
  const charactersOver =
    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortorm';
  const { text } = setup();

  fireEvent.change(text, { target: { value: charactersOver } });
  const charWarning = screen.getByText('Notes must be 250 characters or fewer');
  expect(charWarning).toBeInTheDocument();
});

test('form error styling is present when charcter count is over', () => {
  const charactersOver =
    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortorm';
  const { text } = setup();
  const textDiv = screen.getByTestId('text-area');
  expect(text.value).toBe('');
  fireEvent.change(text, { target: { value: charactersOver } });
  expect(text.value).toBe(charactersOver);
  expect(textDiv.className).toContain('govuk-form-group--error');
});
