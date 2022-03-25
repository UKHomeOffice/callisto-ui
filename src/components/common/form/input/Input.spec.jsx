import { screen, render, fireEvent } from '@testing-library/react'

import Input from './Input'

describe('Input', () => {
  it('should render an input component with the correct heading', () => {
    render(
      <Input
        name="test"
        heading="What is your name?"
        headingSize="l"
        inputWidth="10"
      />
    )

    const heading = screen.getByText('What is your name?')
    expect(heading).toBeTruthy()
  })

  it('should render an input component with the correct hint', () => {
    render(
      <Input
        name="test"
        heading="What is your name?"
        headingSize="l"
        inputWidth="10"
        hint="eg. John"
      />
    )

    const hint = screen.getByText('eg. John')

    expect(hint).toBeTruthy()
  })

  it('should update the input value on change', () => {
    const handleFormChangeMock = jest.fn()
    render(
      <Input
        name="test"
        heading="What is your name?"
        headingSize="l"
        inputWidth="10"
        hint="eg. John"
        handleFormChange={(event) => handleFormChangeMock(event)}
      />
    )

    const input = screen.getByTestId('input-box')
    fireEvent.change(input, { target: { value: 'John' } })
    expect(input.value).toBe('John')
  })

  it('should pre-fill the input if value is passed in', () => {
    render(
      <Input
        name="test"
        heading="What is your name?"
        headingSize="l"
        inputWidth="10"
        hint="eg. John"
        value="Bob"
        handleFormChange={(event) => handleFormChangeMock(event)}
      />
    )

    const input = screen.getByTestId('input-box')
    expect(input.value).toBe('Bob')
  })

  it('should display an error message when there is an error', () => {
    render(
      <Input
        name="test"
        heading="What is your name?"
        headingSize="l"
        inputWidth="10"
        errors={[
          {
            inputName: 'test',
            message: 'Enter a name',
          },
        ]}
      />
    )

    const errorMessage = screen.getByText('Enter a name')
    expect(errorMessage).toBeTruthy()
  })

  it('should add error styling to input box when there is an error', () => {
    render(
      <Input
        name="test"
        heading="What is your name?"
        headingSize="l"
        inputWidth="10"
        errors={[
          {
            inputName: 'test',
            message: 'Enter a name',
          },
        ]}
      />
    )

    const inputBox = screen.getByTestId('input-box')
    expect(inputBox.className).toContain('govuk-input--error')
  })

  it('should not add error styling to input box when there is not an error', () => {
    render(
      <Input
        name="test"
        heading="What is your name?"
        headingSize="l"
        inputWidth="10"
        errors={[]}
      />
    )

    const inputBox = screen.getByTestId('input-box')
    expect(inputBox.className).not.toContain('govuk-input--error')
  })
})
