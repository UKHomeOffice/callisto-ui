import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// This class needs looking at to check it works as we want

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
          {errors.map((error) => {
            return (
              <li
                key={error.key}
                id={`summary-error-${error.key}`}
                data-testid={`error-message-body-${error.key}`}
              >
                <Link
                  id={`summary-error-message-${error.key}`}
                  to={`#${error.inputName}`}
                >
                  {error.message}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ErrorSummary;

ErrorSummary.propTypes = {
  errors: PropTypes.array,
};
