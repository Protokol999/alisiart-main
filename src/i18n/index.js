import { createContext, useContext, useEffect, useState } from 'react';
import en from './locales/en.json';
import ru from './locales/ru.json';

const dictionaries = { en, ru };
const defaultLanguage = 'en';

const I18nContext = createContext({
  language: defaultLanguage,
  setLanguage: () => {},
  t: key => key
});

const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return defaultLanguage;
  }

  const savedLanguage = window.localStorage.getItem('language');

  if (savedLanguage && dictionaries[savedLanguage]) {
    return savedLanguage;
  }

  return defaultLanguage;
};

const translate = (dictionary, key) => {
  return (
    key.split('.').reduce((value, part) => value?.[part], dictionary) ?? key
  );
};

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = key => translate(dictionaries[language], key);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
