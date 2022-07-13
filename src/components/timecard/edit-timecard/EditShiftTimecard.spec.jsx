import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditShiftTimecard from './EditShiftTimecard';

describe('EditShiftTimecard', () => {
  it('should display a summary list with titles for shift, hours and meal break', () => {
    render(
      <EditShiftTimecard
        register={jest.fn()}
        handleSubmit={jest.fn()}
        errors={{}}
      />,
      {
        wrapper: MemoryRouter,
      }
    );

    const shiftDetailsTitles = ['Shift', 'Hours', 'Meal break'];

    shiftDetailsTitles.map((title) => {
      expect(screen.getByText(title)).toBeTruthy();
    });
  });
});
