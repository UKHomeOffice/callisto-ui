import { Link } from 'react-router-dom';

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
        <p>
          {' '}
          Any unsaved changes will have been lost. Please try again later.{' '}
        </p>
        <p className="govuk-body-m">
          <Link to={'/#'} className="govuk-link">
            Report a problem
          </Link>
          &nbsp;to help us solve the issue faster.
        </p>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full govuk-button-group govuk-!-margin-bottom-0">
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
      </div>
    </div>
  );
};

export default ApplicationError;
