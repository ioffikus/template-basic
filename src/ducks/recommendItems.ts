import { createAction, createReducer } from 'redux-act';
import { AxiosResponse } from 'axios';
import { GET } from 'src/core/API';
import EndpointsConfig from 'src/configs/endpoints';

export const REDUCER = 'RECOMMEND_ITEMS';
const NS = `${REDUCER}__`;

interface IRecommendItemsResponse extends Alicanto.API.GET_CATALOG_GROUPS_SLUG_RESPONSE {
  content: Alicanto.Models.CatalogItem[];
}

export interface IRecommendItemsState extends Alicanto.API.GET_CATALOG_GROUPS_SLUG_RESPONSE, Store.IReduxCommonState {}

export const initialState: IRecommendItemsState = {
  slug: '',
  type: '',
  content: [],
  isRequesting: false,
  isRequestError: false,
};

const reducer = createReducer<IRecommendItemsState>({}, initialState);

const callSuccess = createAction<IRecommendItemsResponse>(`${NS}CALL_SUCCESS`);
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

export const getRecommendItems = (abortToken: string): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(callRequest());
    GET(
      {
        url: EndpointsConfig.RECOMMEND_ITEMS,
        params: { page_size: '5' },
      },
      xShopHeaders,
      abortToken,
    )
      .then((resp: AxiosResponse) => {
        const data = resp.data as IRecommendItemsResponse;
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
