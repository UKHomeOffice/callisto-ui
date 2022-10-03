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
        Please try again later. <br />
        <a href="#">Report a problem</a> to help us solve the issue faster.
      </div>
    </div>
  );
};

export default ServiceError;
