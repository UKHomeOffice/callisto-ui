import { fireEvent, screen } from '@testing-library/react';
import { renderWithTimecardContext } from '../../../test/helpers/TimecardContext';
import { inputNames } from '../../../utils/constants';
import { ContextTimeEntry } from '../../../utils/time-entry-utils/ContextTimeEntry';
import StartFinishTimeInput from './StartFinishTimeInput';

const mockRegister = jest.fn();
const timeEntry = new ContextTimeEntry();

const timeEntryWithFinishNextDay = new ContextTimeEntry();
timeEntryWithFinishNextDay.setFinishNextDay(true);

describe('StartFinishTimeInput', () => {
  it('should display titles for each input box', () => {
    renderWithTimecardContext(
      <StartFinishTimeInput
        name={'shift'}
        errors={{}}
        register={mockRegister}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
        getValues={jest.fn()}
      />
    );

    const startTimeTitle = screen.getByText('Start time');
    const finishTimeTitle = screen.getByText('Finish time');

    expect(startTimeTitle).toBeTruthy();
    expect(finishTimeTitle).toBeTruthy();
  });

  it('should display hints for each input box', () => {
    renderWithTimecardContext(
      <StartFinishTimeInput
        name={'shift'}
        errors={{}}
        register={mockRegister}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
        getValues={jest.fn()}
      />
    );

    const startTimeHint = screen.getByText('For example, 08:00');
    const finishTimeHint = screen.getByText('For example, 16:00');

    expect(startTimeHint).toBeTruthy();
    expect(finishTimeHint).toBeTruthy();
  });

  it('should update the input value on change', () => {
    renderWithTimecardContext(
      <StartFinishTimeInput
        name={'shift'}
        errors={{}}
        register={mockRegister}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
        getValues={jest.fn()}
      />
    );

    const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
    const finishTimeInput = screen.getByTestId(inputNames.shiftFinishTime);

    fireEvent.change(startTimeInput, { target: { value: '08:00' } });
    fireEvent.change(finishTimeInput, { target: { value: '16:00' } });

    expect(startTimeInput.value).toBe('08:00');
    expect(finishTimeInput.value).toBe('16:00');
  });

  it('should pre-fill the inputs if values are passed in', () => {
    renderWithTimecardContext(
      <StartFinishTimeInput
        name={'shift'}
        startTimeValue="07:00"
        finishTimeValue="17:00"
        errors={{}}
        register={mockRegister}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
        getValues={jest.fn()}
      />
    );

    const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
    const finishTimeInput = screen.getByTestId(inputNames.shiftFinishTime);

    expect(startTimeInput.value).toBe('07:00');
    expect(finishTimeInput.value).toBe('17:00');
  });

  describe('Finishes next day', () => {
    it('should display "Finishes next day" text if finishNextDay is true', () => {
      renderWithTimecardContext(
        <StartFinishTimeInput
          name={'shift'}
          startTimeValue="07:00"
          finishTimeValue="01:00"
          errors={{}}
          register={mockRegister}
          timeEntry={timeEntryWithFinishNextDay}
          timeEntriesIndex={0}
          getValues={jest.fn()}
        />
      );

      const finishesNextDayText = screen.getByText('Finishes next day');

      expect(finishesNextDayText).toBeTruthy();
    });

    it('should not display "Finishes next day" text if finishNextDay is false', () => {
      renderWithTimecardContext(
        <StartFinishTimeInput
          name={'shift'}
          startTimeValue="07:00"
          finishTimeValue="17:00"
          errors={{}}
          register={mockRegister}
          timeEntry={timeEntry}
          timeEntriesIndex={0}
          getValues={jest.fn()}
        />
      );

      const finishesNextDayText = screen.queryByText('Finishes next day');

      expect(finishesNextDayText).toBeFalsy();
    });
  });

  describe('error messages', () => {
    it('should only display error messages for errors which contain matching input name', () => {
      const startTimeErrorMessage =
        'You must enter a start time in the HH:MM 24 hour clock format';

      renderWithTimecardContext(
        <StartFinishTimeInput
          name={'shift'}
          errors={{
            'radio-error': { message: 'Select a radio button' }, // error message for another component
            [inputNames.shiftStartTime]: { message: startTimeErrorMessage },
          }}
          register={mockRegister}
          timeEntry={timeEntry}
          timeEntriesIndex={0}
          getValues={jest.fn()}
        />
      );

      const radioError = screen.queryByText('Select a radio button');
      const startTimeError = screen.getByText(startTimeErrorMessage);

      expect(radioError).toBeFalsy();
      expect(startTimeError).toBeTruthy();
    });
    it('should display error messages in the correct order', () => {
      const startTimeErrorMessage =
        'You must enter a start time in the HH:MM 24 hour clock format';
      const finishTimeErrorMessage =
        'You must enter a finish time in the HH:MM 24 hour clock format';
      const expectedErrorMessage =
        'Error:You must enter a start time in the HH:MM 24 hour clock format';

      renderWithTimecardContext(
        <div>
          <StartFinishTimeInput
            name={'shift'}
            errors={{
              'radio-error': { message: 'Select a radio button' }, // error message for another component
              [inputNames.shiftFinishTime]: { message: finishTimeErrorMessage },
              [inputNames.shiftStartTime]: { message: startTimeErrorMessage },
            }}
            register={mockRegister}
            timeEntry={timeEntry}
            timeEntriesIndex={0}
            getValues={jest.fn()}
          />
        </div>
      );

      const firstError = screen.getByTestId('error-box').firstChild.textContent;

      expect(firstError).toEqual(expectedErrorMessage);
    });
  });
});
