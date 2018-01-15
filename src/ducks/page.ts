import { createAction, createReducer } from 'redux-act';
import { AxiosResponse } from 'axios';
import _ from 'lodash';
import { GET } from 'src/core/API';
import EndpointsConfig from 'src/configs/endpoints';

export const REDUCER = 'PAGE';
const NS = `${REDUCER}__`;

export interface IPageState extends Alicanto.API.GET_PAGES_SLUG_RESPONSE, Store.IReduxCommonState {}

export const initialState: IPageState = {
  content: null,
  isRequesting: false,
  isRequestError: false,
};

const reducer = createReducer<IPageState>({}, initialState);

const callSuccess = createAction<Alicanto.API.GET_PAGES_SLUG_RESPONSE>(`${NS}CALL_SUCCESS`);
reducer.on(callSuccess, (state, { content }) => {
  return {
    ...state,
    content,
    isRequesting: false,
    isRequestError: false,
  };
});

const callFailure = createAction(`${NS}CALL_FAILURE`);
reducer.on(callFailure, state => ({
  ...state,
  content: null,
  isRequestError: true,
}));

const callRequest = createAction(`${NS}CALL_REQUEST`);
reducer.on(callRequest, state => ({
  ...state,
  isRequesting: true,
}));

export const getPageData = (params: object): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(callRequest());
    const slug = _.get(params, 'slug', null);
    GET(
      {
        url: `${EndpointsConfig.PAGES}${slug}`,
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        const data = resp.data as Alicanto.API.GET_PAGES_SLUG_RESPONSE;
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
