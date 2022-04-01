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
        register={registerMock}
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
          errors={{
            test: { message: 'Date cannot be blank' },
            'test-day': { message: 'Enter a day' },
            'test-month': { message: 'Enter a month' },
            'test-year': { message: 'Enter a year' },
          }}
          register={registerMock}
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
          errors={{ 'test-day': { message: 'Enter a day' } }}
          register={registerMock}
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
          errors={{ 'test-month': { message: 'Enter a month' } }}
          register={registerMock}
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
          errors={{ 'test-year': { message: 'Enter a year' } }}
          register={registerMock}
        />
      );

      const yearInputBox = screen.getByTestId('year-input');
      expect(yearInputBox.className).toContain('govuk-input--error');
    });
  });
});
