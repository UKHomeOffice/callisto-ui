import { useTranslation } from 'react-i18next';

const TestNav = () => {
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    const lang = event.target.value;
    console.log(event.target.getAttribute('value'));
    console.log(lang);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <>
      <h1>{t('welcome')}</h1>
      <p>{t('other')}</p>
      <select name="language" onChange={handleChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
    </>
  );
};

export default TestNav;
