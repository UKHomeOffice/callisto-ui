import { useTranslation } from 'react-i18next';

const Test = () => {
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    const lang = event.target.value;
    console.log(lang);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <>
      <div className="date">{t('date', { date: new Date() })}</div>
      <select name="language" onChange={handleChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
      <h1>{t('welcome')}</h1>
      <p>{t('other')}</p>
    </>
  );
};

export default Test;
