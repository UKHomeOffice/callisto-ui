import { Link } from 'react-router-dom';

const ServiceError = () => {
  return (
    <div
      className="govuk-error-summary"
      aria-labelledby="error-summary-title"
      role="alert"
      data-module="govuk-error-summary"
    >
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        Sorry, there is a problem with the service
      </h2>
      <div className="govuk-error-summary__body">
        <p> Please try again later. </p>
        <p className="govuk-body-m">
          <Link to={'/#'} className="govuk-link">
            Report a problem
          </Link>
          &nbsp;to help us solve the issue faster.
        </p>
      </div>
    </div>
  );
};

export default ServiceError;
