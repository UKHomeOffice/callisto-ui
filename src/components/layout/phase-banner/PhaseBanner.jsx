import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import '../../../i18n';

const PhaseBanner = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <div
        className="govuk-phase-banner"
        style={{ backgroundColor: 'white', borderTop: '1px solid #b1b4b6' }}
      >
        <p className="govuk-phase-banner__content">
          <strong className="govuk-tag govuk-phase-banner__content__tag">
            {t('header.beta.name')}
          </strong>
          <span className="govuk-phase-banner__text">
            <Trans
              i18nKey="header.beta.feedback"
              t={t}
              components={{
                feedback_anchor: <Link className="govuk-link" to="/" />,
              }}
            />
          </span>
        </p>
      </div>
    </>
  );
};

export default PhaseBanner;
