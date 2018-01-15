import { createAction, createReducer } from 'redux-act';

export const REDUCER = 'ROUTES';
const NS = `${REDUCER}__`;

export interface IRoutesState extends Alicanto.Models.Routes {}

export const initialState: IRoutesState = {};

const reducer = createReducer<IRoutesState>({}, initialState);

export const setRoutes = createAction<Alicanto.Models.Routes>(`${NS}SET_ROUTES`);
reducer.on(setRoutes, (_, routes) => ({
  ...routes,
}));

export default reducer;
