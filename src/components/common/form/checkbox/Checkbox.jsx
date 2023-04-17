import PropTypes from 'prop-types';

const Checkbox = ({ text, name, isChecked, handleChange }) => {
  return (
    <div className="govuk-form-group">
      <fieldset className="govuk-fieldset  mobile-checkbox" aria-describedby={name}>
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l"></legend>

        <div className="govuk-checkboxes" data-module="govuk-checkboxes">
          <div className="govuk-checkboxes__item ">
            <input
              className={'govuk-checkboxes__input'}
              id={name}
              name={name}
              type="checkbox"
              value={name}
              checked={isChecked}
              onChange={handleChange}
            />
            <label
              className="govuk-label govuk-checkboxes__label"
              htmlFor={name}
            >
              {text}
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

Checkbox.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

export default Checkbox;
