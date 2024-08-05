import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Language } from '../i18n';

export const LOCALE_FEATURE_KEY = 'locale';

type Locale = Language;

export interface LocaleState {
  localeState: Locale;
}

const initialState: LocaleState = {
  localeState: Language.EN,
};

export const localeSlice = createSlice({
  name: LOCALE_FEATURE_KEY,
  initialState,
  reducers: {
    setLocale: (state, { payload: language }: PayloadAction<Language>) => {
      state.localeState = language;
    },
  },
});

export const { setLocale } = localeSlice.actions;

export const localeReducer = localeSlice.reducer;
