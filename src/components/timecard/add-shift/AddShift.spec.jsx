import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AddShift from './AddShift';

const mockRegister = jest.fn();
const handleSubmit = jest.fn();
const errors = [];

describe('AddShift', () => {
  it('should render a radios component with the correct shift types', () => {
    const shiftTypes = [
      'Shift',
      'Scheduled rest day',
      'Non-working day',
      'On call',
      'Absence',
      'Training',
      'Overtime',
    ];

    render(
      <AddShift
        register={mockRegister}
        handleSubmit={handleSubmit}
        errors={errors}
      />,
      {
        wrapper: MemoryRouter,
      }
    );

    shiftTypes.map((option) => {
      expect(screen.getByText(option)).toBeTruthy();
    });
  });
});
