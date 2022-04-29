import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import {
  format as formatDate,
  formatRelative,
  formatDistance,
  isDate,
} from 'date-fns';
import { enGB, fr } from 'date-fns/locale';
//import { DateTime } from 'luxon';

const locales = { enGB, fr };
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (isDate(value)) {
          const locale = locales[lng];
          //return formatDate(value, format, { locale });
          return formatDate(value, 'PPPP', { locale });
        }
      },
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

//i18n.languages = ['en', 'fr'];
// i18n.services.formatter.add('DATE_HUGE', (value, lng, options) => {
//   return DateTime.fromJSDate(value)
//     .setLocale(lng)
//     .toLocaleString(DateTime.DATE_HUGE);
// });
export default i18n;
