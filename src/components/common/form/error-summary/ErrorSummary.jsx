import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';

const ErrorSummary = ({ errors, keys }) => {
  const callbackRef = (summaryErrorList) => {
    if (summaryErrorList) {
      summaryErrorList.children['summary-error-0'].children[
        'summary-error-0-message'
      ];
    }
  };

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
        <ul className="govuk-list govuk-error-summary__list" ref={callbackRef}>
          {keys.map((key, i) => (
            <li key={i} id={`summary-error-${i}`}>
              <HashLink id={`summary-error-${i}-message`} to={`#${key}`}>
                {errors[key].message}
              </HashLink>
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
  keys: PropTypes.array,
};
