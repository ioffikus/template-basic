import { createAction, createReducer } from 'redux-act';
import { AxiosResponse } from 'axios';
import { GET } from 'src/core/API';
import EndpointsConfig from 'src/configs/endpoints';

export const REDUCER = 'CATEGORIES_MENU';
const NS = `${REDUCER}__`;

interface ICategoriesMenuResponse extends Alicanto.API.GET_CATALOG_GROUPS_SLUG_RESPONSE {
  content: Alicanto.Models.Category[];
}

export interface ICategoriesMenuState extends ICategoriesMenuResponse, Store.IReduxCommonState {}

export const initialState: ICategoriesMenuState = {
  slug: '',
  type: '',
  content: [],
  isRequesting: false,
  isRequestError: false,
};

const reducer = createReducer<ICategoriesMenuState>({}, initialState);

const callSuccess = createAction<ICategoriesMenuResponse>(`${NS}CALL_SUCCESS`);
reducer.on(callSuccess, (state, { slug, type, content }) => {
  return {
    ...state,
    slug,
    type,
    content: [...content],
    isRequestError: false,
    isRequesting: false,
  };
});

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
  isRequesting: true,
}));

export const getCategoriesMenu = (abortToken: string): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(callRequest());
    GET(
      {
        url: EndpointsConfig.CATEGORIES_MENU,
      },
      xShopHeaders,
      abortToken,
    )
      .then((resp: AxiosResponse) => {
        const data = resp.data as ICategoriesMenuResponse;
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
