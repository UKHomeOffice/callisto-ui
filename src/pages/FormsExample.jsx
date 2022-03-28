import React, { useState } from 'react'
import DateInput from '../components/common/form/date-input/DateInput'
import ErrorSummary from '../components/common/form/error-summary/ErrorSummary'
import Input from '../components/common/form/input/Input'
import Radios from '../components/common/form/radios/Radios'

const FormsExample = () => {
  const [form, setForm] = useState({
    name: '',
    whereDoYouLive: '',
    'dateOfBirth-day': '',
    'dateOfBirth-month': '',
    'dateOfBirth-year': '',
  })
  const [errors, setErrors] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setSubmitted(true)
    await validateInput()
    console.log(form)
  }

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const validateInput = async () => {
    const errorsArray = []
    if (form.name === '') {
      errorsArray.push({
        inputName: 'name',
        message: 'Enter a name',
      })
    }
    if (form.whereDoYouLive === '') {
      errorsArray.push({
        inputName: 'whereDoYouLive',
        message: 'Select a location',
      })
    }
    if (form['dateOfBirth-day'] === '') {
      errorsArray.push({
        inputName: 'dateOfBirth-day',
        message: 'Day cannot be blank',
      })
    }
    if (form['dateOfBirth-month'] === '') {
      errorsArray.push({
        inputName: 'dateOfBirth-month',
        message: 'Month cannot be blank',
      })
    }
    if (form['dateOfBirth-year'] === '') {
      errorsArray.push({
        inputName: 'dateOfBirth-year',
        message: 'Year cannot be blank',
      })
    }
    setErrors(errorsArray)
  }

  return (
    <>
      <h1 className="govuk-heading-xl">Forms example page</h1>
      {submitted && errors.length > 0 && <ErrorSummary errors={errors} />}

      <Input
        name="name"
        heading="What is your name?"
        headingSize="m"
        inputWidth="20"
        hint="eg. Joanna"
        errors={errors}
        value={form.name}
        handleFormChange={(event) => handleFormChange(event)}
      />

      <Radios
        name="whereDoYouLive"
        heading="Where do you live?"
        headingSize="m"
        options={['England', 'Ireland', 'Scotland', 'Wales']}
        hint="eg. England"
        errors={errors}
        value={form.whereDoYouLive}
        handleFormChange={(event) => handleFormChange(event)}
      />

      <DateInput
        name="dateOfBirth"
        heading="What is your date of birth?"
        headingSize="m"
        hint="eg. 01/01/1990"
        errors={errors}
        dayValue={form['dateOfBirth-day']}
        monthValue={form['dateOfBirth-month']}
        yearValue={form['dateOfBirth-year']}
        handleFormChange={(event) => handleFormChange(event)}
      />

      <button
        className="govuk-button"
        data-module="govuk-button"
        onClick={() => {
          handleSubmit()
        }}
      >
        Save and continue
      </button>
    </>
  )
}

export default FormsExample
