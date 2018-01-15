import { createAction, createReducer } from 'redux-act';

export const REDUCER = 'UI';
const NS = `${REDUCER}__`;

export interface IUIState extends Alicanto.Models.UI, Store.IReduxCommonState {}

export const initialState: IUIState = {
  isRequestError: false,
  isRequesting: false,
};

const reducer = createReducer<IUIState>({}, initialState);

export const setUI = createAction<Alicanto.Models.UI>(`${NS}SET_SUCCESS`);
reducer.on(setUI, (state, ui) => ({
  ...state,
  ...ui,
  isRequesting: false,
  isRequestError: false,
}));

const setError = createAction(`${NS}SET_ERROR`);
reducer.on(setError, state => ({
  ...initialState,
  isRequestError: true,
}));

const setStart = createAction(`${NS}SET_START`);
reducer.on(setStart, state => ({
  ...state,
  isRequesting: true,
}));

export default reducer;
