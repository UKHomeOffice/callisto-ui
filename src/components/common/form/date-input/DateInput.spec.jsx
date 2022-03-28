import { screen, render, fireEvent } from '@testing-library/react';

import DateInput from './DateInput';

describe('DateInput', () => {
  it('should render a date input component with the correct heading', () => {
    render(
      <DateInput name="test" heading="What is the date?" headingSize="l" />
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
      />
    );

    const hint = screen.getByText('eg. 01/01/2022');

    expect(hint).toBeTruthy();
  });

  it('should update the input value on change', () => {
    const handleFormChangeMock = jest.fn();

    render(
      <DateInput
        name="test"
        heading="What is the date?"
        headingSize="l"
        hint="eg. 01/01/2022"
        handleFormChange={(event) => handleFormChangeMock(event)}
      />
    );

    const dayInput = screen.getByTestId('day-input');
    const monthInput = screen.getByTestId('month-input');
    const yearInput = screen.getByTestId('year-input');

    fireEvent.change(dayInput, { target: { value: '01' } });
    fireEvent.change(monthInput, { target: { value: '03' } });
    fireEvent.change(yearInput, { target: { value: '2022' } });

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
        handleDayChange={(event) => handleDayChangeMock(event)}
        handleMonthChange={(event) => handleMonthChangeMock(event)}
        handleYearChange={(event) => handleYearChangeMock(event)}
      />
    );

    const dayInput = screen.getByTestId('day-input');
    const monthInput = screen.getByTestId('month-input');
    const yearInput = screen.getByTestId('year-input');

    expect(dayInput.value).toBe('01');
    expect(monthInput.value).toBe('01');
    expect(yearInput.value).toBe('2022');
  });

  describe('Error messages', () => {
    it('should display all error messages', () => {
      render(
        <DateInput
          name="test"
          heading="What is the date?"
          headingSize="l"
          errors={[
            { inputName: 'test', message: 'Date cannot be blank' },
            { inputName: 'test-day', message: 'Enter a day' },
            { inputName: 'test-month', message: 'Enter a month' },
            { inputName: 'test-year', message: 'Enter a year' },
          ]}
        />
      );

      const overallErrorMessage = screen.getByText('Date cannot be blank');
      const dayErrorMessage = screen.getByText('Enter a day');
      const monthErrorMessage = screen.getByText('Enter a month');
      const yearErrorMessage = screen.getByText('Enter a year');

      expect(overallErrorMessage).toBeTruthy();
      expect(dayErrorMessage).toBeTruthy();
      expect(monthErrorMessage).toBeTruthy();
      expect(yearErrorMessage).toBeTruthy();
    });

    it('should add error styling to day input box', () => {
      render(
        <DateInput
          name="test"
          heading="What is the date?"
          headingSize="l"
          errors={[{ inputName: 'test-day', message: 'Enter a day' }]}
        />
      );

      const dayInputBox = screen.getByTestId('day-input');
      expect(dayInputBox.className).toContain('govuk-input--error');
    });

    it('should add error styling to month input box', () => {
      render(
        <DateInput
          name="test"
          heading="What is the date?"
          headingSize="l"
          errors={[{ inputName: 'test-month', message: 'Enter a month' }]}
        />
      );

      const monthInputBox = screen.getByTestId('month-input');
      expect(monthInputBox.className).toContain('govuk-input--error');
    });

    it('should add error styling to year input box', () => {
      render(
        <DateInput
          name="test"
          heading="What is the date?"
          headingSize="l"
          errors={[{ inputName: 'test-year', message: 'Enter a year' }]}
        />
      );

      const yearInputBox = screen.getByTestId('year-input');
      expect(yearInputBox.className).toContain('govuk-input--error');
    });
  });
});
