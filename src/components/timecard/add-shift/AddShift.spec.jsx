import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AddTimePeriod from './AddShift';

const mockRegister = jest.fn();
const handleSubmit = jest.fn();
const errors = [];

describe('AddTimePeriod', () => {
  it('should render a radios component with the correct time periods', () => {
    const timePeriods = [
      'Shift',
      'Scheduled rest day',
      'Non-working day',
      'On call',
      'Absence',
      'Training',
      'Overtime',
    ];

    render(
      <AddTimePeriod
        register={mockRegister}
        handleSubmit={handleSubmit}
        errors={errors}
      />,
      {
        wrapper: MemoryRouter,
      }
    );

    timePeriods.map((option) => {
      expect(screen.getByText(option)).toBeTruthy();
    });
  });
});
