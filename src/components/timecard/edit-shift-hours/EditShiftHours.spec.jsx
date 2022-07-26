import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { renderWithTimecardContext } from '../../../test/Helpers/TimecardContext';
import EditShiftHours from './EditShiftHours';

describe('EditShiftHours', () => {
  it('should display an error when pressing save with no start time added', async () => {
    renderWithTimecardContext(<EditShiftHours />);

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
