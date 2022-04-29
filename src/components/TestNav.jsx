import { useTranslation } from 'react-i18next';

const Test = ({ text }) => {
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    const lang = event.target.value;
    console.log(lang);
    i18n.changeLanguage(event.target.value);
  };

  const date = new Date();
  return (
    <>
      <div className="date">
        <p>{t('todaysDate', { date })}</p>
      </div>
      <select name="language" onChange={handleChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
      <h1>{t('welcome')}</h1>
      <p>{t('other')}</p>
      <p>{t({ text })}</p>
    </>
  );
};

export default Test;
