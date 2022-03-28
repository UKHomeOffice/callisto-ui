import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
//import userEvent from "@testing-library/user-event";
import React from 'react';
//import { MemoryRouter } from "react-router-dom";
import Home from '../../pages/Home';

test('link is showing on page', () => {
  render(<Home />);
  screen.debug();
  //checking that the link is on the page
  const link = screen.getAllByText('Back to my calendar');
  expect(link).toBeInTheDocument();

  //check the link navigates to page with calendar
  //userEvent.click(screen.getByText('back to my calendar'));
});
