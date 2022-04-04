import PropTypes from 'prop-types';

const Checkbox = ({ text }) => {
  return (
    <div className="govuk-form-group">
      <fieldset
        className="govuk-fieldset"
        aria-describedby="shift-longer-than-24hours"
      >
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l"></legend>

        <div className="govuk-checkboxes" data-module="govuk-checkboxes">
          <div className="govuk-checkboxes__item">
            <input
              className="govuk-checkboxes__input"
              id="shiftlongerthan24hours"
              name="shiftlongerthan24hours"
              type="checkbox"
              value="shiftlongerthan24hours"
            />
            <label
              className="govuk-label govuk-checkboxes__label"
              htmlFor="shiftlongerthan24hours"
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
};

export default Checkbox;
