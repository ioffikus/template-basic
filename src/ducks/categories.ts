import { createAction, createReducer } from 'redux-act';
import { AxiosResponse } from 'axios';
import { GET } from 'src/core/API';
import EndpointsConfig from 'src/configs/endpoints';

export const REDUCER = 'CATEGORIES';
const NS = `${REDUCER}__`;

export interface ICategoriesState extends Alicanto.API.GET_CATALOG_CATEGORIES_RESPONSE, Store.IReduxCommonState {}

export const initialState: ICategoriesState = {
  next: null,
  previous: null,
  count: 0,
  results: [],
  isRequesting: false,
  isRequestError: false,
};

const reducer = createReducer<ICategoriesState>({}, initialState);

const callSuccess = createAction<Alicanto.API.GET_CATALOG_CATEGORIES_RESPONSE>(`${NS}CALL_SUCCESS`);
reducer.on(callSuccess, (state, { next, previous, count, results }) => ({
  ...state,
  next,
  previous,
  count,
  results: [...results],
  isRequestError: false,
  isRequesting: false,
}));

const callFailure = createAction(`${NS}CALL_FAILURE`);
reducer.on(callFailure, state => ({
  ...state,
  next: null,
  previous: null,
  count: 0,
  results: [],
  isRequesting: false,
  isRequestError: true,
}));

const callRequest = createAction(`${NS}CALL_REQUEST`);
reducer.on(callRequest, state => ({
  ...state,
  isRequesting: true,
}));

export const getCategories = (abortToken: string): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(callRequest());
    GET(
      {
        url: EndpointsConfig.CATEGORIES,
        params: { page_size: '100' },
      },
      xShopHeaders,
      abortToken,
    )
      .then((resp: AxiosResponse) => {
        const data = resp.data as Alicanto.API.GET_CATALOG_CATEGORIES_RESPONSE;
        dispatch(callSuccess(data));
        resolve();
      })
      .catch(error => {
        dispatch(callFailure());
        reject(error);
      });
  });
};

export default reducer;
