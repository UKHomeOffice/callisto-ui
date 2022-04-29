import { useTranslation } from 'react-i18next';

function Date() {
  const { t, i18n } = useTranslation();
  const date = new Date();
  return (
    <div className="date">
      <p>{t('todaysDate', { date })}</p>
    </div>
  );
}

export default Date;
