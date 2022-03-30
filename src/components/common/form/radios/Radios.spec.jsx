import { screen, render, fireEvent } from '@testing-library/react';

import Radios from './Radios';

describe('Radios', () => {
  it('should render a radios component with the correct heading', () => {
    render(
      <Radios
        name="radios"
        heading="Where do you live?"
        headingSize="l"
        options={['England', 'Ireland', 'Scotland', 'Wales']}
      />
    );

    const heading = screen.getByText('Where do you live?');
    expect(heading).toBeTruthy();
  });

  it('should render a radios component with the correct radio options', () => {
    const options = ['England', 'Ireland', 'Scotland', 'Wales'];

    render(
      <Radios
        name="radios"
        heading="Where do you live?"
        headingSize="l"
        options={options}
      />
    );

    options.map((option) => {
      expect(screen.getByText(option)).toBeTruthy();
    });
  });

  it('should render a radios component with the correct hint', () => {
    render(
      <Radios
        name="radios"
        heading="Where do you live?"
        headingSize="l"
        options={['England', 'Ireland', 'Scotland', 'Wales']}
        hint="eg. England"
      />
    );

    const hint = screen.getByText('eg. England');
    expect(hint).toBeTruthy();
  });

  it('should set the radio button to checked when it is selected', () => {
    render(
      <Radios
        name="radios"
        heading="Where do you live?"
        headingSize="l"
        options={['England', 'Ireland', 'Scotland', 'Wales']}
        hint="eg. England"
      />
    );

    const radioButton = screen.getByLabelText('England');
    fireEvent.click(radioButton, { target: { checked: true } });

    expect(radioButton).toBeChecked();
  });

  it('should preselect the radio button if value is passed in', () => {
    render(
      <Radios
        name="radios"
        heading="Where do you live?"
        headingSize="l"
        options={['England', 'Ireland', 'Scotland', 'Wales']}
        hint="eg. England"
        value="England"
      />
    );

    const radioButton = screen.getByLabelText('England');
    expect(radioButton).toBeChecked();
  });

  it('should display an error message when there is an error', () => {
    render(
      <Radios
        name="radios"
        heading="Where do you live?"
        headingSize="l"
        options={['England', 'Ireland', 'Scotland', 'Wales']}
        errors={[
          {
            inputName: 'radios',
            message: 'Select a radio button',
          },
        ]}
      />
    );

    const errorMessage = screen.getByText('Select a radio button');
    expect(errorMessage).toBeTruthy();
  });

  it('should add error styling to radios when there is an error', () => {
    render(
      <Radios
        name="radios"
        heading="Where do you live?"
        headingSize="l"
        options={['England', 'Ireland', 'Scotland', 'Wales']}
        errors={[
          {
            inputName: 'radios',
            message: 'Select a radio button',
          },
        ]}
      />
    );

    const inputBox = screen.getByTestId('radio-buttons');
    expect(inputBox.className).toContain('govuk-form-group--error');
  });

  it('should not add error styling to radios when there is not an error', () => {
    render(
      <Radios
        name="radios"
        heading="Where do you live?"
        headingSize="l"
        options={['England', 'Ireland', 'Scotland', 'Wales']}
      />
    );

    const inputBox = screen.getByTestId('radio-buttons');
    expect(inputBox.className).not.toContain('govuk-form-group--error');
  });
});
