/* eslint-disable prettier/prettier */
import { ContextTimeEntry } from '../../../utils/time-entry-utils/ContextTimeEntry';
import StartFinishDateInput from './StartFinishDateInput';
import { screen } from '@testing-library/react';
import { testInputNames } from '../../../utils/test-utils/testConstants';
import { renderWithApplicationContext } from '../../../test/helpers/TestApplicationContext';

const mockRegister = jest.fn();

const timeEntryWithFinishNextDay = new ContextTimeEntry();
timeEntryWithFinishNextDay.setFinishNextDay(true);

describe('StartFinishDateInput', () => {
  it('should display titles and hints for each input box', () => {
    renderWithApplicationContext(
      <StartFinishDateInput
        name="Date"
        errors={[]}
        startTimeValue="2022-09-02"
        finishTimeValue="2022-09-02"
        startEntryExists={false}
        finishEntryExists={false}
        timecardDate="2022-09-02"
        register={mockRegister}
        formState={jest.fn()}
        finishNextDay={false}
        getFormValues={jest.fn()}
      />
    );

    const startTimeTitle = screen.getByText('Start date');
    const finishTimeTitle = screen.getByText('Finish date');

    expect(startTimeTitle).toBeTruthy();
    expect(finishTimeTitle).toBeTruthy();

    const startTimeHint = screen.getByText('For example, 23 7 2021');
    const finishTimeHint = screen.getByText('For example, 24 7 2021');

    expect(startTimeHint).toBeTruthy();
    expect(finishTimeHint).toBeTruthy();
  });

  it('should update the end date if finish next day is true on new records', () => {
    renderWithApplicationContext(
      <StartFinishDateInput
        name="Date"
        errors={[]}
        startTimeValue="2022-09-02"
        finishTimeValue="2022-09-02"
        startEntryExists={false}
        finishEntryExists={false}
        timecardDate="2022-09-02"
        register={mockRegister}
        formState={jest.fn()}
        finishNextDay={true}
        getFormValues={jest.fn()}
      />
    );

    const startDay = screen.getByTestId(testInputNames.startDay);
    const startDayValue = startDay.getAttribute('value');
    expect(startDayValue).toEqual('02');
    const startMonth = screen.getByTestId(testInputNames.startMonth);
    const startMonthValue = startMonth.getAttribute('value');
    expect(startMonthValue).toEqual('09');
    const startYear = screen.getByTestId(testInputNames.startYear);
    const startYearValue = startYear.getAttribute('value');
    expect(startYearValue).toEqual('2022');

    const endDay = screen.getByTestId(testInputNames.endDay);
    const endDayValue = endDay.getAttribute('value');
    expect(endDayValue).toEqual('03');
    const endMonth = screen.getByTestId(testInputNames.endMonth);
    const endMonthValue = endMonth.getAttribute('value');
    expect(endMonthValue).toEqual('09');
    const endYear = screen.getByTestId(testInputNames.endYear);
    const endYearValue = endYear.getAttribute('value');
    expect(endYearValue).toEqual('2022');
  });

  it('should update the end date if finish next day is true on and a record already exists', () => {
    renderWithApplicationContext(
      <StartFinishDateInput
        name="Date"
        errors={[]}
        startTimeValue="2022-09-02"
        finishTimeValue="2022-09-02"
        startEntryExists={true}
        finishEntryExists={true}
        timecardDate="2022-09-02"
        register={mockRegister}
        formState={jest.fn()}
        finishNextDay={true}
        getFormValues={jest.fn()}
      />
    );

    const endDay = screen.getByTestId(testInputNames.endDay);
    const endDayValue = endDay.getAttribute('value');
    expect(endDayValue).toEqual('03');
    const endMonth = screen.getByTestId(testInputNames.endMonth);
    const endMonthValue = endMonth.getAttribute('value');
    expect(endMonthValue).toEqual('09');
    const endYear = screen.getByTestId(testInputNames.endYear);
    const endYearValue = endYear.getAttribute('value');
    expect(endYearValue).toEqual('2022');
  });
});
