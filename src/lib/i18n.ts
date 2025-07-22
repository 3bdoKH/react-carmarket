import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../public/locales/en/common.json';
import ar from '../../public/locales/ar/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      ar: { common: ar },
    },
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n; 