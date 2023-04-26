import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const DateInput = ({
  name,
  heading,
  headingSize,
  hint,
  errors,
  dayValue,
  monthValue,
  yearValue,
  register,
  formState,
  getFormValues,
  setStartDate,
  setEndDate,
  updateFinishTimeText,
}) => {
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    updateErrorMessages();
  }, [formState]);

  const updateErrorMessages = () => {
    const findErrors =
      errors && errors.filter((error) => error.inputName.includes(name));
    let relevantErrorMessages = [];
    if (findErrors) {
      relevantErrorMessages = findErrors.map((error) => {
        return error.message;
      });
    }
    setErrorMessages(relevantErrorMessages);
  };

  return (
    <>
      <div
        className={`govuk-form-group ${
          errorMessages.length > 0 && 'govuk-form-group--error'
        }`}
      >
        <fieldset
          className="govuk-fieldset"
          role="group"
          aria-describedby={`${name}-hint`}
        >
          <legend
            className={`govuk-fieldset__legend govuk-fieldset__legend--${headingSize}`}
          >
            <h1 className="govuk-fieldset__heading">{heading}</h1>
          </legend>
          <div id={`${name}-hint`} className="govuk-hint">
            {hint}
          </div>
          {errorMessages &&
            errorMessages.map((error, i) => (
              <p id={`${name}-error`} key={i} className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> {error}
              </p>
            ))}

          <div className="govuk-date-input" id={name}>
            <DateInputItem
              name={name}
              dateType="day"
              errors={errors}
              defaultValue={dayValue}
              register={register}
              getFormValues={getFormValues}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              width={2}
              updateFinishTimeText={updateFinishTimeText}
            />

            <DateInputItem
              name={name}
              dateType="month"
              errors={errors}
              defaultValue={monthValue}
              register={register}
              getFormValues={getFormValues}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              width={2}
              updateFinishTimeText={updateFinishTimeText}
            />

            <DateInputItem
              name={name}
              dateType="year"
              errors={errors}
              defaultValue={yearValue}
              register={register}
              getFormValues={getFormValues}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              width={3}
              updateFinishTimeText={updateFinishTimeText}
            />
          </div>
        </fieldset>
      </div>
    </>
  );
};

const DateInputItem = ({
  name,
  dateType,
  errors,
  defaultValue,
  register,
  getFormValues,
  setStartDate,
  setEndDate,
  width,
  updateFinishTimeText,
}) => {
  const capitalisedName = dateType[0].toUpperCase() + dateType.substring(1);

  const setDates = () => {
    const startDate =
      getFormValues(`startDate-year`) +
      '-' +
      getFormValues(`startDate-month`) +
      '-' +
      getFormValues(`startDate-day`);

    setStartDate(startDate);

    const endDate =
      getFormValues(`finishDate-year`) +
      '-' +
      getFormValues(`finishDate-month`) +
      '-' +
      getFormValues(`finishDate-day`);

    setEndDate(endDate);

    updateFinishTimeText(startDate, endDate);
  };

  return (
    <div className="govuk-date-input__item">
      <div className="govuk-form-group">
        <label
          className="govuk-label govuk-date-input__label"
          htmlFor={`${name}-${dateType}`}
        >
          {capitalisedName}
        </label>
        <input
          className={`govuk-input govuk-date-input__input govuk-input--width-${width} ${
            errors &&
            errors.find((error) => {
              return error.inputName === name + '-' + dateType;
            }) &&
            'govuk-input--error'
          }`}
          id={`${name}-${dateType}`}
          name={`${name}-${dateType}`}
          type="text"
          inputMode="numeric"
          data-testid={`${name}-${dateType}-input`}
          defaultValue={defaultValue}
          {...register(name + '-' + dateType, {
            onChange: () => setDates(),
          })}
        />
      </div>
    </div>
  );
};

export default DateInput;

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  headingSize: PropTypes.string.isRequired,
  hint: PropTypes.string,
  errors: PropTypes.array,
  dayValue: PropTypes.string,
  monthValue: PropTypes.string,
  yearValue: PropTypes.string,
  register: PropTypes.any.isRequired,
  formState: PropTypes.any,
  getFormValues: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  updateFinishTimeText: PropTypes.func,
};

DateInputItem.propTypes = {
  name: PropTypes.string.isRequired,
  dateType: PropTypes.string,
  errors: PropTypes.array,
  defaultValue: PropTypes.string,
  pattern: PropTypes.any,
  register: PropTypes.any.isRequired,
  getFormValues: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  updateFinishTimeText: PropTypes.func,
};
