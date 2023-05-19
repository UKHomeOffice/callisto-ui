import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../../i18n';
import { PropTypes } from 'prop-types';

const NavigationLinks = ({ url, previousDay, nextDay }) => {
  const { t } = useTranslation('common');
  return (
    <div className="govuk-button-group button-group-row">
      <Link
        className="govuk-link govuk-link--no-visited-state"
        to={`/${url}/${previousDay}`}
        data-testid="navigation-previous-link"
      >
        {t('navigation.previousDay')}
      </Link>
      <Link
        className="govuk-link govuk-link--no-visited-state"
        to={`/${url}/${nextDay}`}
        data-testid="navigation-next-link"
      >
        {t('navigation.nextDay')}
      </Link>
    </div>
  );
};

export default NavigationLinks;
NavigationLinks.propTypes = {
  url: PropTypes.string,
  previousDay: PropTypes.string,
  nextDay: PropTypes.string,
};
