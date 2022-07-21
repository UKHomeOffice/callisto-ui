import { fireEvent, screen } from '@testing-library/react';
import NotesSummaryList from './NotesSummaryList';
import { renderWithRouter } from '../../../../../test/Helpers';

test('should render summary list with correct keys', () => {
  renderWithRouter(<NotesSummaryList />);
  const key = screen.getByText('Notes');
  expect(key).toBeTruthy();
});

test('it should render an add link', () => {
  renderWithRouter(<NotesSummaryList />);
  const link = screen.getByRole('link', { name: /Add notes/i });
  expect(link).toBeInTheDocument();
});

test('should show notes component when add is clicked', () => {
  renderWithRouter(<NotesSummaryList />);
  const link = screen.getByRole('link', { name: /Add notes/i });
  fireEvent.click(link);
  expect(document.getElementById('text-area')).toBeInTheDocument();
});
