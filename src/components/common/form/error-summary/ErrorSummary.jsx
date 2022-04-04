import PropTypes from 'prop-types';

const ErrorSummary = ({ errors }) => {
  return (
    <div
      className="govuk-error-summary"
      aria-labelledby="error-summary-title"
      role="alert"
      data-module="govuk-error-summary"
    >
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        There is a problem
      </h2>
      <div className="govuk-error-summary__body">
        <ul className="govuk-list govuk-error-summary__list">
          {Object.keys(errors).map((key, i) => (
            <li key={i}>
              <a href={`#${key}`}>{errors[key].message}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ErrorSummary;

ErrorSummary.propTypes = {
  errors: PropTypes.any,
};
