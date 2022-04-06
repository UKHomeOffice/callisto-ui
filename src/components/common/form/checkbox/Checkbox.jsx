import PropTypes from 'prop-types';

const Checkbox = ({ text, name }) => {
  return (
    <div className="govuk-form-group">
      <fieldset className="govuk-fieldset" aria-describedby={name}>
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l"></legend>

        <div className="govuk-checkboxes" data-module="govuk-checkboxes">
          <div className="govuk-checkboxes__item">
            <input
              className={'govuk-checkboxes__input'}
              id={name}
              name={name}
              type="checkbox"
              value={name}
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
};

export default Checkbox;
