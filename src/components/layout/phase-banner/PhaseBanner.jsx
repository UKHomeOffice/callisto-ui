import { Link } from 'react-router-dom';

const PhaseBanner = () => {
  return (
    <>
      <div
        className="govuk-phase-banner mobile-phase-banner"
        style={{ backgroundColor: 'white', borderTop: '1px solid #b1b4b6' }}
      >
        <p className="govuk-phase-banner__content">
          <strong className="govuk-tag govuk-phase-banner__content__tag">
            beta
          </strong>
          <span className="govuk-phase-banner__text">
            This is a new service – your{' '}
            <Link className="govuk-link" to="/">
              feedback
            </Link>{' '}
            will help us to improve it.
          </span>
        </p>
      </div>
    </>
  );
};

export default PhaseBanner;
