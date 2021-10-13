import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.js';
import ru from './locales/ru.js';

i18n
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'EN',
    resources: {
      EN: {
        translation: en,
      },
      RU: {
        translation: ru,
      },
    },
  });

export default i18n;
