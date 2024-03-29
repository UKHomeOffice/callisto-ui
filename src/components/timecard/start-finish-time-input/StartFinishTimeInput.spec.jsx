import { fireEvent, screen } from '@testing-library/react';
import { renderWithApplicationContext } from '../../../test/helpers/TestApplicationContext';
import { inputNames } from '../../../utils/constants';
import { ContextTimeEntry } from '../../../utils/time-entry-utils/ContextTimeEntry';
import StartFinishTimeInput from './StartFinishTimeInput';

const mockRegister = jest.fn();
const timeEntry = new ContextTimeEntry();

const timeEntryWithFinishNextDay = new ContextTimeEntry();
timeEntryWithFinishNextDay.setFinishNextDay(true);

describe('StartFinishTimeInput', () => {
  it('should display titles for each input box', () => {
    renderWithApplicationContext(
      <StartFinishTimeInput
        name={'shift'}
        errors={[]}
        register={mockRegister}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
        updateFinishTimeText={jest.fn()}
      />
    );

    const startTimeTitle = screen.getByText('Start time');
    const finishTimeTitle = screen.getByText('Finish time');

    expect(startTimeTitle).toBeTruthy();
    expect(finishTimeTitle).toBeTruthy();
  });

  it('should display hints for each input box', () => {
    renderWithApplicationContext(
      <StartFinishTimeInput
        name={'shift'}
        errors={[]}
        register={mockRegister}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
        updateFinishTimeText={jest.fn()}
      />
    );

    const startTimeHint = screen.getByText('For example, 08:00');
    const finishTimeHint = screen.getByText('For example, 16:00');

    expect(startTimeHint).toBeTruthy();
    expect(finishTimeHint).toBeTruthy();
  });

  it('should update the input value on change', () => {
    renderWithApplicationContext(
      <StartFinishTimeInput
        name={'shift'}
        errors={[]}
        register={mockRegister}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
        updateFinishTimeText={jest.fn()}
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
    renderWithApplicationContext(
      <StartFinishTimeInput
        name={'shift'}
        startTimeValue="07:00"
        finishTimeValue="17:00"
        errors={[]}
        register={mockRegister}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
        updateFinishTimeText={jest.fn()}
      />
    );

    const startTimeInput = screen.getByTestId(inputNames.shiftStartTime);
    const finishTimeInput = screen.getByTestId(inputNames.shiftFinishTime);

    expect(startTimeInput.value).toBe('07:00');
    expect(finishTimeInput.value).toBe('17:00');
  });

  describe('Finishes next day', () => {
    it('should display "Finishes next day" text if its passed into the componenet', () => {
      renderWithApplicationContext(
        <StartFinishTimeInput
          name={'shift'}
          startTimeValue="07:00"
          finishTimeValue="01:00"
          errors={[]}
          register={mockRegister}
          timeEntry={timeEntryWithFinishNextDay}
          timeEntriesIndex={0}
          updateFinishTimeText={jest.fn()}
          finishTimeText={'Finishes next day'}
        />
      );

      const finishesNextDayText = screen.getByText('Finishes next day');

      expect(finishesNextDayText).toBeTruthy();
    });

    it('should not display "Finishes next day" text if shift finishes same day', () => {
      renderWithApplicationContext(
        <StartFinishTimeInput
          name={'shift'}
          startTimeValue="07:00"
          finishTimeValue="17:00"
          errors={[]}
          register={mockRegister}
          timeEntry={timeEntry}
          timeEntriesIndex={0}
          updateFinishTimeText={jest.fn()}
          finishTimeText={''}
        />
      );

      const finishesNextDayText = screen.queryByText('Finishes next day');

      expect(finishesNextDayText).toBeFalsy();
    });
  });

  describe('error messages', () => {
    it('should display error messages in the correct order', () => {
      const startTimeErrorMessage =
        'You must enter a start time in the HH:MM 24 hour clock format';
      const finishTimeErrorMessage =
        'You must enter a finish time in the HH:MM 24 hour clock format';
      const expectedErrorMessage =
        'Error:You must enter a start time in the HH:MM 24 hour clock format';

      renderWithApplicationContext(
        <div>
          <StartFinishTimeInput
            name={'shift'}
            errors={[
              {
                key: inputNames.shiftFinishTime,
                inputName: inputNames.shiftFinishTime,
                message: finishTimeErrorMessage,
                errorPriority: 2,
              },
              {
                key: inputNames.shiftStartTime,
                inputName: inputNames.shiftStartTime,
                message: startTimeErrorMessage,
                errorPriority: 1,
              },
            ]}
            register={mockRegister}
            timeEntry={timeEntry}
            timeEntriesIndex={0}
            updateFinishTimeText={jest.fn()}
          />
        </div>
      );

      const firstError = screen.getByTestId('error-box').firstChild.textContent;

      expect(firstError).toEqual(expectedErrorMessage);
    });
  });
});
