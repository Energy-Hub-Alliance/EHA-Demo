import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useAppSelector } from '../../store/store';

export const useLangauageInitialization = () => {
  const { i18n } = useTranslation();
  const preferredLanguage = useAppSelector((state) => state.locale.localeState);

  useEffect(() => {
    if (preferredLanguage) {
      i18n.changeLanguage(preferredLanguage);
    }
  }, [i18n, preferredLanguage]);
};
