import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translation_en } from './locales/en/translations';
import { translation_fr } from './locales/fr/translations';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: translation_en,
    },
    fr: {
      translations: translation_fr,
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

i18n.languages = ['en', 'fr'];

export default i18n;
