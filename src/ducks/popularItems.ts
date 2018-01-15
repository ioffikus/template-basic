import { createAction, createReducer } from 'redux-act';
import { AxiosResponse } from 'axios';
import { GET } from 'src/core/API';
import EndpointsConfig from 'src/configs/endpoints';

export const REDUCER = 'POPULAR_ITEMS';
const NS = `${REDUCER}__`;

interface IPopularItemsResponse extends Alicanto.API.GET_CATALOG_GROUPS_SLUG_RESPONSE {
  content: Alicanto.Models.CatalogItem[];
}

export interface IPopularItemsState extends Alicanto.API.GET_CATALOG_GROUPS_SLUG_RESPONSE, Store.IReduxCommonState {}

export const initialState: IPopularItemsState = {
  slug: '',
  type: '',
  content: [],
  isRequesting: false,
  isRequestError: false,
};

const reducer = createReducer<IPopularItemsState>({}, initialState);

const callSuccess = createAction<IPopularItemsResponse>(`${NS}CALL_SUCCESS`);
reducer.on(callSuccess, (state, { slug, type, content }) => ({
  ...state,
  slug,
  type,
  content: [...content],
  isRequestError: false,
  isRequesting: false,
}));

const callFailure = createAction(`${NS}CALL_FAILURE`);
reducer.on(callFailure, state => ({
  ...state,
  slug: '',
  type: '',
  content: [],
  isRequesting: false,
  isRequestError: true,
}));

const callRequest = createAction(`${NS}CALL_REQUEST`);
reducer.on(callRequest, state => ({
  ...state,
  content: [],
  isRequesting: true,
}));

export const getPopularItems = (abortToken: string): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(callRequest());
    GET(
      {
        url: EndpointsConfig.POPULAR_ITEMS,
      },
      xShopHeaders,
      abortToken,
    )
      .then((resp: AxiosResponse) => {
        const data = resp.data as IPopularItemsResponse;
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
