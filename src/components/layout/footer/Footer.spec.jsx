import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Footer from './Footer';

test('it renders footer with Home Office text', () => {
  render(<Footer />, { wrapper: BrowserRouter });

  const hoText = screen.getByText(/home office/i);

  expect(hoText).toBeInTheDocument();
});
