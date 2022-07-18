import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { TimecardContext } from '../../../pages/timecard/Timecard';
import EditShiftHours from './EditShiftHours';

describe('EditShiftHours', () => {
  it('should display an error when pressing save with no start time added', async () => {
    render(
      <TimecardContext.Provider
        value={{ summaryErrors: {}, setSummaryErrors: jest.fn() }}
      >
        <EditShiftHours />
      </TimecardContext.Provider>
    );

    act(() => {
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      const errorMessage = screen.getByText(
        'You must enter a start time in the HH:MM 24 hour clock format'
      );
      expect(errorMessage).toBeTruthy();
    });
  });
});
