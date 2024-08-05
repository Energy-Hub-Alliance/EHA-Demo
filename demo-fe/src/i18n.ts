import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translationsEn, translationsHu, translationsDe } from './locales';

export enum Language {
  EN = 'en',
  HU = 'hu',
  DE = 'de',
}

const resources = {
  [Language.EN]: {
    translation: translationsEn,
  },
  [Language.HU]: {
    translation: translationsHu,
  },
  [Language.DE]: {
    translation: translationsDe,
  },
};

i18next.use(initReactI18next).init({
  fallbackLng: Language.EN,
  debug: true,
  keySeparator: '.',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});
