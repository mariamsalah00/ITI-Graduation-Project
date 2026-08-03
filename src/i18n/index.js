import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import ar from './locales/ar.json';

const RTL_LANGUAGES = ['ar'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false }, // React already escapes
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'glowcare_lang',
    },
  });

// Keep <html lang/dir> in sync with the active language — this is what
// actually flips the layout to RTL for Arabic, not just the text.
const applyDocumentDirection = (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = RTL_LANGUAGES.includes(lng) ? 'rtl' : 'ltr';
};

applyDocumentDirection(i18n.resolvedLanguage);
i18n.on('languageChanged', applyDocumentDirection);

export default i18n;
