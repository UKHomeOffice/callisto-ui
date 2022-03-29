import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SummaryList from './SummaryList';


test('should render summary list with correct keys', () => {
    render(
        <SummaryList
        shiftType='Early shift'
        hours='08:00 to 16:00'
        mealBreak='30 minutes taken' />
    );

    const key1 = screen.getByText('Shift');
    const key2 = screen.getByText('Hours');
    const key3 = screen.getByText('Meal Break');

    expect(key1).toBeTruthy();
    expect(key2).toBeTruthy();
    expect(key3).toBeTruthy();
  });


test('it should render three links', () => {
  render(<SummaryList
    shiftType='Early shift'
    hours='08:00 to 16:00'
    mealBreak='30 minutes taken' />);

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(3);
});

