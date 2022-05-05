import { useTranslation } from 'react-i18next';

function TodaysDate() {
  const { t } = useTranslation();
  const date = new Date();
  return (
    <div className="govuk-heading-s" data-testid="date">
      <h3>{t('todaysDate', { date })}</h3>
    </div>
  );
}

export default TodaysDate;
