import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { renderWithTimecardContext } from '../../../test/helpers/TimecardContext';
import EditShiftHours from './EditShiftHours';

describe('EditShiftHours', () => {
  it('should display an error when pressing save with no start time added', async () => {
    renderWithTimecardContext(
      <EditShiftHours setShowEditShiftHours={jest.fn()} />
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

  it('should display an error when pressing save with an invalid start time', async () => {
    renderWithTimecardContext(
      <EditShiftHours setShowEditShiftHours={jest.fn()} />
    );

    act(() => {
      const startTimeInput = screen.getByTestId('hours-start-time');
      fireEvent.change(startTimeInput, { target: { value: '8:00' } });

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

  it('should not display an error when pressing save with a valid start time', async () => {
    renderWithTimecardContext(
      <EditShiftHours setShowEditShiftHours={jest.fn()} />
    );

    act(() => {
      const startTimeInput = screen.getByTestId('hours-start-time');
      fireEvent.change(startTimeInput, { target: { value: '08:00' } });

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      const errorMessage = screen.queryByText(
        'You must enter a start time in the HH:MM 24 hour clock format'
      );
      expect(errorMessage).toBeFalsy();
    });
  });

  it('should display an error when pressing save with an invalid finish time', async () => {
    renderWithTimecardContext(
      <EditShiftHours setShowEditShiftHours={jest.fn()} />
    );

    act(() => {
      const finishTimeInput = screen.getByTestId('hours-finish-time');
      fireEvent.change(finishTimeInput, { target: { value: '8:00' } });

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      const errorMessage = screen.getByText(
        'You must enter a finish time in the HH:MM 24 hour clock format'
      );
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should not display an error when pressing save with a valid finish time', async () => {
    renderWithTimecardContext(
      <EditShiftHours setShowEditShiftHours={jest.fn()} />
    );

    act(() => {
      const finishTimeInput = screen.getByTestId('hours-finish-time');
      fireEvent.change(finishTimeInput, { target: { value: '08:00' } });

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      const errorMessage = screen.queryByText(
        'You must enter a finish time in the HH:MM 24 hour clock format'
      );
      expect(errorMessage).toBeFalsy();
    });
  });
});
