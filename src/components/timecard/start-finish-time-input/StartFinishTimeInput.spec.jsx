import { fireEvent, render, screen } from '@testing-library/react';
import StartFinishTimeInput from './StartFinishTimeInput';

const mockRegister = jest.fn();

describe('StartFinishTimeInput', () => {
  it('should display titles for each input box', () => {
    render(
      <StartFinishTimeInput
        name={'shift'}
        errors={{}}
        register={mockRegister}
      />
    );

    const startTimeTitle = screen.getByText('Start time');
    const finishTimeTitle = screen.getByText('Finish time');

    expect(startTimeTitle).toBeTruthy();
    expect(finishTimeTitle).toBeTruthy();
  });

  it('should display hints for each input box', () => {
    render(
      <StartFinishTimeInput
        name={'shift'}
        errors={{}}
        register={mockRegister}
      />
    );

    const startTimeHint = screen.getByText('For example, 08:00');
    const finishTimeHint = screen.getByText('For example, 16:00');

    expect(startTimeHint).toBeTruthy();
    expect(finishTimeHint).toBeTruthy();
  });

  it('should update the input value on change', () => {
    render(
      <StartFinishTimeInput
        name={'shift'}
        errors={{}}
        register={mockRegister}
      />
    );

    const startTimeInput = screen.getByTestId('shift-start-time');
    const finishTimeInput = screen.getByTestId('shift-finish-time');

    fireEvent.change(startTimeInput, { target: { value: '08:00' } });
    fireEvent.change(finishTimeInput, { target: { value: '16:00' } });

    expect(startTimeInput.value).toBe('08:00');
    expect(finishTimeInput.value).toBe('16:00');
  });

  it('should pre-fill the inputs if values are passed in', () => {
    render(
      <StartFinishTimeInput
        name={'shift'}
        startTimeValue="07:00"
        finishTimeValue="17:00"
        errors={{}}
        register={mockRegister}
      />
    );

    const startTimeInput = screen.getByTestId('shift-start-time');
    const finishTimeInput = screen.getByTestId('shift-finish-time');

    expect(startTimeInput.value).toBe('07:00');
    expect(finishTimeInput.value).toBe('17:00');
  });

  describe('error messages', () => {
    it('should only display error messages for errors which contain matching input name', () => {
      const startTimeErrorMessage =
        'You must enter a start time in the HH:MM 24 hour clock format';

      render(
        <StartFinishTimeInput
          name={'shift'}
          errors={{
            'radio-error': { message: 'Select a radio button' }, // error message for another component
            'shift-start-time': { message: startTimeErrorMessage },
          }}
          register={mockRegister}
        />
      );

      const radioError = screen.queryByText('Select a radio button');
      const startTimeError = screen.getByText(startTimeErrorMessage);

      expect(radioError).toBeFalsy();
      expect(startTimeError).toBeTruthy();
    });
  });
});
