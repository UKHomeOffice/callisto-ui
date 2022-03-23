import { screen, render } from '@testing-library/react'

import Footer from './Footer'

test('it renders footer with Home Office text', () => {
  render(<Footer />)

  const hoText = screen.getByText(/home office/i)

  expect(hoText).toBeInTheDocument()
})
