import { screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { renderWithTimecardContext } from '../../../test/Helpers/TimecardContext';

import SelectTimecardPeriodType from './SelectTimecardPeriodType';

const mockRegister = jest.fn();
const handleSubmit = jest.fn();
const errors = {};

describe('SelectTimecardPeriodType', () => {
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

    renderWithTimecardContext(
      <SelectTimecardPeriodType
        register={mockRegister}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    );

    timePeriods.map((option) => {
      expect(screen.getByText(option)).toBeTruthy();
    });
  });

  it('should display an error message when pressing submit with nothing selected', async () => {
    renderWithTimecardContext(
      <SelectTimecardPeriodType
        register={mockRegister}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    );

    act(() => {
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
    });

    await waitFor(() => {
      const errorMessage = screen.getByText('You must select a time period');
      expect(errorMessage).toBeTruthy();
    });
  });
});
