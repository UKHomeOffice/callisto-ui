import { fireEvent, render, screen } from '@testing-library/react';
import NotesSummaryList from './NotesSummaryList';
import { BrowserRouter } from 'react-router-dom';

test('should render summary list with correct keys', () => {
  render(<NotesSummaryList />, { wrapper: BrowserRouter });

  const key = screen.getByText('Notes');

  expect(key).toBeTruthy();
});

test('it should render an add link', () => {
  render(<NotesSummaryList />, { wrapper: BrowserRouter });

  const link = screen.getByRole('link', { name: /Add notes/i });
  expect(link).toBeInTheDocument();
});

test('should show notes component when add is clicked', () => {
  render(<NotesSummaryList />, { wrapper: BrowserRouter });

  const link = screen.getByRole('link', { name: /Add notes/i });
  fireEvent.click(link);
  expect(document.getElementById('text-area')).toBeInTheDocument();
});
