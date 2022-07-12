import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="govuk-footer" role="contentinfo">
      <div className="govuk-width-container">
        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            A Home Office Digital, Data and Technology service
          </div>
          <div className="govuk-footer__meta-item">
            <Link className="govuk-footer__link" to="/">
              Feedback
            </Link>
          </div>
          <div className="govuk-footer__meta-item">
            <Link className="govuk-footer__link" to="/">
              Help
            </Link>
          </div>
          <div className="govuk-footer__meta-item">
            <Link className="govuk-footer__link" to="https://gov.uk">
              Gov.UK home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
