const Footer = () => {
  return (
    <footer
      className="govuk-footer"
      role="contentinfo"
      style={{
        backgroundColor: '#FFF',
        borderTop: '1px #cbcbcb solid',
      }}
    >
      <div className="govuk-width-container">
        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            A Home Office Digital, Data and Technology service
          </div>
          <div className="govuk-footer__meta-item">
            <a className="govuk-footer__link" href="/">
              Feedback
            </a>
          </div>
          <div className="govuk-footer__meta-item">
            <a className="govuk-footer__link" href="/">
              Help
            </a>
          </div>
          <div className="govuk-footer__meta-item">
            <a className="govuk-footer__link" href="https://gov.uk">
              Gov.UK home
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
