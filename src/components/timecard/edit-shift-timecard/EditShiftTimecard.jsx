import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StartFinishTimeInput from '../start-finish-time-input/StartFinishTimeInput';

const EditShiftTimecard = ({ register, handleSubmit, errors, formState }) => {
  const removeShift = (event) => {
    event.preventDefault();
    console.log('removed');
  };

  const toggleEditShiftHours = (event) => {
    event.preventDefault();
    console.log('open / close hours');
  };

  const changeMealBreak = (event) => {
    event.preventDefault();
    console.log('change meal break');
  };

  return (
    <div className="select-timecard-period-type">
      <dl className="govuk-summary-list govuk-summary-list--no-border govuk-!-margin-bottom-0">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Shift</dt>
          <dd className="govuk-summary-list__actions">
            <Link
              onClick={removeShift}
              className="govuk-link govuk-link--no-visited-state"
              to={'/'}
            >
              Remove<span className="govuk-visually-hidden"> shift</span>
            </Link>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Hours</dt>
          <dd className="govuk-summary-list__actions">
            <Link
              onClick={toggleEditShiftHours}
              className="govuk-link govuk-link--no-visited-state"
              to={'/'}
            >
              Change<span className="govuk-visually-hidden"> hours</span>
            </Link>
          </dd>
        </div>
        <div>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <StartFinishTimeInput
              name={'hours'}
              errors={errors}
              register={register}
              formState={formState}
            />
            <div className="govuk-button-group">
              <button className="govuk-button" type="submit">
                Save
              </button>
              <button
                className="govuk-button govuk-button--secondary"
                type="submit"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Meal break</dt>
          <dd className="govuk-summary-list__actions">
            <Link
              onClick={changeMealBreak}
              className="govuk-link govuk-link--no-visited-state"
              to={'/'}
            >
              Change<span className="govuk-visually-hidden"> meal break</span>
            </Link>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default EditShiftTimecard;

EditShiftTimecard.displayName = 'EditShiftTimecard';
EditShiftTimecard.propTypes = {
  register: PropTypes.any.isRequired,
  handleSubmit: PropTypes.func,
  errors: PropTypes.any.isRequired,
  formState: PropTypes.any,
};
