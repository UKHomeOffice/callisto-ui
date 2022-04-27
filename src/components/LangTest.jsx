import { useTranslation } from 'react-i18next';

const languages = {
  en: { nativeName: 'English' },
  fr: { nativeName: 'French' },
};

const LangTest = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div>
        {Object.keys(languages).map((lang) => (
          <button
            key={lang}
            style={{
              fontWeight: i18n.resolvedLanguage === lang ? 'bold' : 'normal',
            }}
            type="submit"
            onClick={() => i18n.changeLanguage(lang)}
          >
            {languages[lang].nativeName}
          </button>
        ))}
      </div>
      <h1>{t('welcome')}</h1>
      <p>{t('other')}</p>
    </>
  );
};

export default LangTest;
