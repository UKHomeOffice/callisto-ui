import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../../test/Helpers';

import Footer from './Footer';

test('it renders footer with Home Office text', () => {
  renderWithRouter(<Footer />);

  const hoText = screen.getByText(/home office/i);
  expect(hoText).toBeInTheDocument();
});
