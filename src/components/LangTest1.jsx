import { useTranslation } from 'react-i18next';

const LangTest1 = () => {
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    const lang = event.target.value;
    console.log(lang);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <>
      <select name="language" onChange={handleChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
      <h1>{t('welcome')}</h1>
    </>
  );
};

export default LangTest1;
