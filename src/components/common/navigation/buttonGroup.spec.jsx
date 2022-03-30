import { render, screen } from '@testing-library/react';
import ButtonGroup from './ButtonGroup';

test('it should render two buttons', () => {
  render(<ButtonGroup buttonText1="Save" buttonText2="Cancel" />);

  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(2);
});
