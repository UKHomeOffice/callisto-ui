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

  test.each(['8:00', '-00:01', '24:00', 'abcd', '!'])(
    'should display an error when pressing save with an invalid start time',
    async (testValue) => {
      renderWithTimecardContext(
        <EditShiftHours setShowEditShiftHours={jest.fn()} />
      );

      act(() => {
        const startTimeInput = screen.getByTestId('shift-start-time');
        fireEvent.change(startTimeInput, { target: { value: testValue } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        const errorMessage = screen.getByText(
          'You must enter a start time in the HH:MM 24 hour clock format'
        );
        expect(errorMessage).toBeTruthy();
      });
    }
  );

  test.each(['00:00', '08:00', '23:59', '04:26', '0000'])(
    'should not display an error when pressing save with a valid start time',
    async (testValue) => {
      renderWithTimecardContext(
        <EditShiftHours setShowEditShiftHours={jest.fn()} />
      );

      act(() => {
        const startTimeInput = screen.getByTestId('shift-start-time');
        fireEvent.change(startTimeInput, { target: { value: testValue } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        const errorMessage = screen.queryByText(
          'You must enter a start time in the HH:MM 24 hour clock format'
        );
        expect(errorMessage).toBeFalsy();
      });
    }
  );

  test.each(['8:00', '-00:01', '24:00', 'abcd', '!'])(
    'should display an error when pressing save with an invalid finish time',
    async (testValue) => {
      renderWithTimecardContext(
        <EditShiftHours setShowEditShiftHours={jest.fn()} />
      );

      act(() => {
        const finishTimeInput = screen.getByTestId('shift-finish-time');
        fireEvent.change(finishTimeInput, { target: { value: testValue } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        const errorMessage = screen.getByText(
          'You must enter a finish time in the HH:MM 24 hour clock format'
        );
        expect(errorMessage).toBeTruthy();
      });
    }
  );

  test.each(['00:00', '08:00', '23:59', '04:26', '0000'])(
    'should not display an error when pressing save with a valid finish time',
    async (testValue) => {
      renderWithTimecardContext(
        <EditShiftHours setShowEditShiftHours={jest.fn()} />
      );

      act(() => {
        const finishTimeInput = screen.getByTestId('shift-finish-time');
        fireEvent.change(finishTimeInput, { target: { value: testValue } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        const errorMessage = screen.queryByText(
          'You must enter a finish time in the HH:MM 24 hour clock format'
        );
        expect(errorMessage).toBeFalsy();
      });
    }
  );
});
