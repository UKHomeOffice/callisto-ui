import {
  fireEvent,
  render,
  screen,
  waitFor,
  userEvent,
  findByText,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import NotesSummaryList from './NotesSummaryList';
import Notes from './Notes';

function CostInput() {
  const [error, setError] = useState(null);
  const [characters, setCharacters] = useState('');
  const maxLength = 250;

  handleChange = (ev) => {
    ev.preventDefault();
    const textInput = ev.currentTarget.value;
    setCharacters(textInput);
    if (characters.length > maxLength) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <Notes characters={characters} error={error} onChange={handleChange} />
  );
}

const setup = () => {
  const utils = render(<Notes />);
  const text = utils.getByTestId('exceeding-characters');
  //const charWarning = utils.getByTestId('exceeding-characters-error');
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

test('error when character count exceeded', () => {
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
  // await waitFor(() =>
  //   expect(
  //     screen.findByText('Notes must be 250 characters or fewer')
  //   ).toBeInTheDocument();
  // });
});

test('should render summary list with correct keys', () => {
  render(<NotesSummaryList />);

  const key = screen.getByText('Notes');

  expect(key).toBeTruthy();
});

test('it should render an add link', () => {
  render(<NotesSummaryList />);

  const link = screen.getByRole('link', { name: /Add notes/i });
  expect(link).toBeInTheDocument();
});

test('should show notes component when add is clicked', () => {
  render(<NotesSummaryList />);

  const link = screen.getByRole('link', { name: /Add notes/i });
  fireEvent.click(link);
  expect(document.getElementById('text-area')).toBeInTheDocument();
});
