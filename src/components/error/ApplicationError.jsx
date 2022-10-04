const ApplicationError = () => {
  const onRefresh = (event) => {
    event.preventDefault();
    location.reload();
  };

  const onGoBack = (event) => {
    event.preventDefault();
    window.location.replace(document.referrer);
  };

  return (
    <div>
      <h1 className="govuk-heading-l">
        Sorry, there is a problem with the service
      </h1>
      <div
        data-testid="app-error-message"
        className="govuk-error-summary__body"
      >
        Any unsaved changes will have been lost. Please try again later. <br />
        <a href="/#">Report a problem</a> to help us solve the issue faster.
      </div>

      <div className="govuk-summary-list__row govuk-summary-list__row--no-border">
        <dt className="govuk-summary-list__key">
          <div className="govuk-button-group govuk-!-margin-bottom-0">
            <button
              className="govuk-button"
              data-module="govuk-button"
              onClick={onRefresh}
            >
              Refresh
            </button>
            <button
              className="govuk-button govuk-button--secondary"
              type="button"
              onClick={onGoBack}
            >
              Go back
            </button>
          </div>
        </dt>
      </div>
    </div>
  );
};

export default ApplicationError;
