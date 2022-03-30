import PropTypes from 'prop-types';

const SummaryList = ({ shiftType, hours, mealBreak }) => {
  return (
    <dl className="govuk-summary-list">
      <div className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key">Shift</dt>
        <dd className="govuk-summary-list__value">{shiftType}</dd>
        <dd className="govuk-summary-list__actions">
          <a className="govuk-link" href="/">
            Remove<span className="govuk-visually-hidden"> shift</span>
          </a>
        </dd>
      </div>
      <div className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key">Hours</dt>
        <dd className="govuk-summary-list__value">{hours}</dd>
        <dd className="govuk-summary-list__actions">
          <a className="govuk-link" href="/">
            Change<span className="govuk-visually-hidden"> hours</span>
          </a>
        </dd>
      </div>
      <div className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key">Meal Break</dt>
        <dd className="govuk-summary-list__value">{mealBreak}</dd>
        <dd className="govuk-summary-list__actions">
          <a className="govuk-link" href="/">
            Change
            <span className="govuk-visually-hidden"> contact details</span>
          </a>
        </dd>
      </div>
    </dl>
  );
};

SummaryList.propTypes = {
  shiftType: PropTypes.string.isRequired,
  hours: PropTypes.string.isRequired,
  mealBreak: PropTypes.string.isRequired,
};

export default SummaryList;
