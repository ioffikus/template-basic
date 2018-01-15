import { createAction, createReducer } from 'redux-act';
import { IObject } from 'src/core/interfaces/IObject';
import currencies from 'src/configs/currencies';

export const REDUCER = 'LOCALE';
const NS = `${REDUCER}__`;

export interface ILocaleState {
  current: string;
  availables: string[];
  currencies: IObject<string>;
}

export const initialState: ILocaleState = {
  currencies,
  current: '',
  availables: [],
};

const reducer = createReducer<ILocaleState>({}, initialState);

export const setAvailableLocales = createAction<string[]>(`${NS}SET_AVAILABLES`);
reducer.on(setAvailableLocales, (state, availables) => ({
  ...state,
  availables: [...availables],
}));

// TODO ch1886
// if (process.env.BROWSER) {
//   window.document.cookie = `locale=${current};path=/;max-age=${CommonCfg.COOKIE_LOCALE_MAX_AGE}`;
//   window.location.reload(true);
// }

export const setLocale = createAction<string>(`${NS}SET_LOCALE`);
reducer.on(setLocale, (state, current) => ({
  ...state,
  current,
}));

export default reducer;
