import { createAction, createReducer } from 'redux-act';

export const REDUCER = 'USER_DELIVERY';
const NS = `${REDUCER}__`;

export interface IUserDeliveryState {
  name: string;
  surname: string;
  email: string;
  phonePrefix: string;
  phoneNumber: string;
  country: string;
  stateRegion: string;
  zipCode: string;
  address: string;
}

export const initialState: IUserDeliveryState = {
  name: '',
  surname: '',
  email: '',
  phonePrefix: '7',
  phoneNumber: '',
  country: '',
  stateRegion: '',
  zipCode: '',
  address: '',
};

const reducer = createReducer<IUserDeliveryState>({}, initialState);

export const set = createAction<IUserDeliveryState>(`${NS}SET`);
reducer.on(
  set,
  (state, { name, surname, email, phonePrefix, phoneNumber, country, stateRegion, zipCode, address }) => ({
    ...state,
    name,
    surname,
    email,
    phonePrefix,
    phoneNumber,
    country,
    stateRegion,
    zipCode,
    address,
  }),
);

export const reset = createAction(`${NS}RESET`);
reducer.on(reset, () => ({
  ...initialState,
}));

export default reducer;
