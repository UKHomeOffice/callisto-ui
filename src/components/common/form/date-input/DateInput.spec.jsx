import { screen, render, fireEvent } from '@testing-library/react';

import DateInput from './DateInput';

describe('DateInput', () => {
  let registerMock;
  beforeEach(() => {
    registerMock = jest.fn();
  });

  it('should render a date input component with the correct heading', () => {
    render(
      <DateInput
        name="test"
        heading="What is the date?"
        headingSize="l"
        register={registerMock}
        getFormValues={jest.fn()}
        setStartDate={jest.fn()}
        setEndDate={jest.fn()}
      />
    );

    const heading = screen.getByText('What is the date?');

    expect(heading).toBeTruthy();
  });

  it('should render a date input component with the correct hint', () => {
    render(
      <DateInput
        name="test"
        heading="What is the date?"
        headingSize="l"
        hint="eg. 01/01/2022"
        register={registerMock}
        getFormValues={jest.fn()}
        setStartDate={jest.fn()}
        setEndDate={jest.fn()}
      />
    );

    const hint = screen.getByText('eg. 01/01/2022');

    expect(hint).toBeTruthy();
  });

  it('should update the input value on change', () => {
    render(
      <DateInput
        name="test"
        heading="What is the date?"
        headingSize="l"
        hint="eg. 01/01/2022"
        register={registerMock}
        getFormValues={jest.fn()}
        setStartDate={jest.fn()}
        setEndDate={jest.fn()}
      />
    );

    const dayInput = screen.getByTestId('test-day-input');
    const monthInput = screen.getByTestId('test-month-input');
    const yearInput = screen.getByTestId('test-year-input');

    fireEvent.change(dayInput, { target: { value: '01' } });
    fireEvent.change(monthInput, { target: { value: '03' } });
    fireEvent.change(yearInput, { target: { value: '2022' } });
    fireEvent.focusOut(yearInput);

    expect(dayInput.value).toBe('01');
    expect(monthInput.value).toBe('03');
    expect(yearInput.value).toBe('2022');
  });

  it('should pre-fill the inputs if values are passed in', () => {
    render(
      <DateInput
        name="test"
        heading="What is the date?"
        headingSize="l"
        hint="eg. 01/01/2022"
        dayValue={'01'}
        monthValue={'01'}
        yearValue={'2022'}
        register={registerMock}
        getFormValues={jest.fn()}
        setStartDate={jest.fn()}
        setEndDate={jest.fn()}
      />
    );

    const dayInput = screen.getByTestId('test-day-input');
    const monthInput = screen.getByTestId('test-month-input');
    const yearInput = screen.getByTestId('test-year-input');

    expect(dayInput.value).toBe('01');
    expect(monthInput.value).toBe('01');
    expect(yearInput.value).toBe('2022');
  });

  describe('Error messages', () => {
    it('should display all error messages', () => {
      render(
        <DateInput
          name="startDate"
          heading="What is the date?"
          headingSize="l"
          errors={[
            {
              key: 'emptystartDateDay',
              inputName: 'startDate-day',
              message: 'Enter a start day',
              errorPriority: 1,
            },
            {
              key: 'emptystartDateMonth',
              inputName: 'startDate-month',
              message: 'Enter a start month',
              errorPriority: 2,
            },
            {
              key: 'emptystartDateYear',
              inputName: 'startDate-year',
              message: 'Enter a start year',
              errorPriority: 3,
            },
          ]}
          register={registerMock}
          getFormValues={jest.fn()}
          setStartDate={jest.fn()}
          setEndDate={jest.fn()}
        />
      );

      const dayErrorMessage = screen.getByText('Enter a start day');
      const monthErrorMessage = screen.getByText('Enter a start month');
      const yearErrorMessage = screen.getByText('Enter a start year');

      expect(dayErrorMessage).toBeTruthy();
      expect(monthErrorMessage).toBeTruthy();
      expect(yearErrorMessage).toBeTruthy();
    });

    it('should add error styling to day input box', () => {
      render(
        <DateInput
          name="startDate"
          heading="What is the date?"
          headingSize="l"
          errors={[
            {
              key: 'emptystartDateDay',
              inputName: 'startDate-day',
              message: 'Enter a start day',
              errorPriority: 1,
            },
            {
              key: 'emptystartDateMonth',
              inputName: 'startDate-month',
              message: 'Enter a start month',
              errorPriority: 2,
            },
            {
              key: 'emptystartDateYear',
              inputName: 'startDate-year',
              message: 'Enter a start year',
              errorPriority: 3,
            },
          ]}
          register={registerMock}
          getFormValues={jest.fn()}
          setStartDate={jest.fn()}
          setEndDate={jest.fn()}
        />
      );

      const dayInputBox = screen.getByTestId('startDate-day-input');
      expect(dayInputBox.className).toContain('govuk-input--error');

      const monthInputBox = screen.getByTestId('startDate-month-input');
      expect(monthInputBox.className).toContain('govuk-input--error');

      const yearInputBox = screen.getByTestId('startDate-year-input');
      expect(yearInputBox.className).toContain('govuk-input--error');
    });
  });
});
