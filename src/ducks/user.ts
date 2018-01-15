import { createAction, createReducer } from 'redux-act';
import { AxiosResponse } from 'axios';
import { GET, PUT } from 'src/core/API';
import EndpointsConfig from 'src/configs/endpoints';

export const REDUCER = 'USER';
const NS = `${REDUCER}__`;

export interface IUserState extends Alicanto.Models.User, Store.IReduxCommonState {}

export const initialState: IUserState = {
  email: null,
  first_name: null,
  last_name: null,
  isRequesting: false,
  isRequestError: false,
};

const reducer = createReducer<IUserState>({}, initialState);

const callSuccess = createAction<Alicanto.Models.User>(`${NS}CALL_SUCCESS`);
reducer.on(callSuccess, (state, { email, first_name, last_name }) => ({
  ...state,
  email,
  first_name,
  last_name,
  isRequesting: false,
  isRequestError: false,
}));

const callFailure = createAction(`${NS}CALL_FAILURE`);
reducer.on(callFailure, state => ({
  ...state,
  email: null,
  first_name: null,
  last_name: null,
  isRequesting: false,
  isRequestError: true,
}));

const callRequest = createAction(`${NS}CALL_REQUEST`);
reducer.on(callRequest, state => ({
  ...state,
  isRequesting: true,
}));

export const getUser = (): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(callRequest());
    GET(
      {
        url: `${EndpointsConfig.USER}`,
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        const data = resp.data as Alicanto.API.GET_USER_RESPONSE;
        dispatch(callSuccess(data));
        resolve();
      })
      .catch(error => {
        dispatch(callFailure());
        reject(error);
      });
  });
};

export const putUser = (user: Alicanto.Models.User, cb: () => void): Store.IReduxThunkCb => (
  dispatch,
  getState,
  xShopHeaders,
) => {
  return new Promise((resolve, reject) => {
    dispatch(callRequest());
    const data: Alicanto.API.PUT_USER_BODY = user;
    PUT(
      {
        data,
        url: `${EndpointsConfig.USER}`,
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        const data = resp.data as Alicanto.API.PUT_USER_RESPONSE;
        dispatch(callSuccess(data));
        if (cb) {
          cb();
        }
        resolve();
      })
      .catch(error => {
        dispatch(callFailure());
        reject(error);
      });
  });
};

export default reducer;
