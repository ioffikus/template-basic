import { createAction, createReducer } from 'redux-act';
import { AxiosResponse } from 'axios';
import { push } from 'connected-react-router';
import { GET, POST } from 'src/core/API';
import EndpointsConfig from 'src/configs/endpoints';

export const REDUCER = 'AUTH';
const NS = `${REDUCER}__`;

export interface IAuthState extends Store.IReduxCommonState {
  isAuthenticated: boolean;
  isAuthLinkRequesting: boolean;
  url: string;
  data: object;
}

export const initialState: IAuthState = {
  isAuthenticated: false,
  isRequesting: false,
  isRequestError: false,
  isAuthLinkRequesting: false,
  url: null,
  data: null,
};

const reducer = createReducer<IAuthState>({}, initialState);

export const loginUserSuccess = createAction(`${NS}LOGIN_USER_SUCCESS`);
reducer.on(loginUserSuccess, state => ({
  ...state,
  isRequesting: false,
  isRequestError: false,
  isAuthenticated: true,
}));

const authLinkSuccess = createAction<{ url: string; data: object }>(`${NS}AUTH_LINK_SUCCESS`);
reducer.on(authLinkSuccess, (state, { url, data }) => ({
  ...state,
  url,
  data: { ...data },
  isAuthLinkRequesting: false,
}));

const loginUserFailure = createAction(`${NS}LOGIN_USER_FAILURE`);
reducer.on(loginUserFailure, state => ({
  ...state,
  isRequesting: false,
  isAuthenticated: false,
  isRequestError: true,
}));

const authLinkFailure = createAction(`${NS}AUTH_LINK_FAILURE`);
reducer.on(authLinkFailure, state => ({
  ...state,
  isAuthLinkRequesting: false,
  url: null,
  data: null,
}));

const loginUserRequest = createAction(`${NS}LOGIN_USER_REQUEST`);
reducer.on(loginUserRequest, state => ({
  ...state,
  isRequesting: true,
}));

const authLinkRequest = createAction(`${NS}AUTH_LINK_REQUEST`);
reducer.on(authLinkRequest, state => ({
  ...state,
  isAuthLinkRequesting: true,
  url: null,
  data: null,
}));

const reset = createAction(`${NS}RESET`);
reducer.on(reset, () => ({
  ...initialState,
}));

export const getAuthLink = (): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(authLinkRequest());
    GET(
      {
        url: `${EndpointsConfig.AUTH.AUTH_LINK}`,
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        const { url, data } = resp.data as { url: string; data: object };
        // WIP does not use Alicanto.API.GET_AUTH_OAUTH_PROVIDER_URL_RESPONSE for develop
        dispatch(authLinkSuccess({ url, data }));
        resolve();
      })
      .catch(error => {
        dispatch(authLinkFailure());
        reject(error);
      });
  });
};

export const loginUser = (username: string, password: string): Store.IReduxThunkCb => (
  dispatch,
  getState,
  xShopHeaders,
) => {
  return new Promise((resolve, reject) => {
    dispatch(loginUserRequest());
    const data: Alicanto.API.POST_AUTH_LOGIN_BODY = {
      username,
      password,
    };
    POST(
      {
        data,
        url: `${EndpointsConfig.AUTH.LOGIN}`,
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        dispatch(loginUserSuccess());
        if (process.env.BROWSER) {
          // TODO: move to external
          // redirect to home page
          dispatch(push('/'));
        }
        resolve();
      })
      .catch(error => {
        dispatch(loginUserFailure());
        reject(error);
      });
  });
};

export const logoutUser = (cb: () => void): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(loginUserRequest());
    GET(
      {
        url: `${EndpointsConfig.AUTH.LOGOUT}`,
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        dispatch(loginUserSuccess());
        dispatch(reset());
        if (cb) {
          cb();
        }
        if (process.env.BROWSER) {
          // TODO: move to external
          // redirect to home page
          dispatch(push('/'));
        }
        resolve();
      })
      .catch(error => {
        dispatch(loginUserFailure());
        reject(error);
      });
  });
};

export default reducer;
