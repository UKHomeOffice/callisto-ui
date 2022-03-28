const PhaseBanner = () => {
  return (
    <>
      <div
        className="govuk-phase-banner"
        style={{ backgroundColor: 'white', borderTop: '1px solid #b1b4b6' }}
      >
        <p className="govuk-phase-banner__content">
          <strong className="govuk-tag govuk-phase-banner__content__tag">
            beta
          </strong>
          <span className="govuk-phase-banner__text">
            This is a new service – your{' '}
            <a className="govuk-link" href="/">
              feedback
            </a>{' '}
            will help us to improve it.
          </span>
        </p>
      </div>
    </>
  );
};

export default PhaseBanner;
