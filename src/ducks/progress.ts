import { createAction, createReducer } from 'redux-act';

export const REDUCER = 'PROGRESS';
const NS = `${REDUCER}__`;

export interface IProgressState {
  isLoading: boolean;
  fillLoad: boolean;
}

export const initialState: IProgressState = {
  isLoading: false,
  fillLoad: false,
};

const reducer = createReducer<IProgressState>({}, initialState);

export const showProgress = createAction(`${NS}SHOW_PROGRESS`);
reducer.on(showProgress, state => ({
  ...state,
  isLoading: true,
}));

export const fillProgress = createAction(`${NS}FILL_PROGRESS`);
reducer.on(fillProgress, state => ({
  ...state,
  fillLoad: true,
}));

export const hideProgress = createAction(`${NS}HIDE_PROGRESS`);
reducer.on(hideProgress, state => ({
  ...state,
  isLoading: false,
  fillLoad: false,
}));

export default reducer;
