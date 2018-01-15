import { createAction, createReducer } from 'redux-act';
import { AxiosResponse } from 'axios';
import _ from 'lodash';
import { ICatalogQueryState } from 'src/ducks/catalogQuery';
import { GET } from 'src/core/API';
import EndpointsConfig from 'src/configs/endpoints';

export const REDUCER = 'CATALOG';
const NS = `${REDUCER}__`;

export interface ICatalogState extends Alicanto.API.GET_CATALOG_RESPONSE, Store.IReduxCommonState {}

export const initialState: ICatalogState = {
  next: null,
  previous: null,
  count: 0,
  results: [],
  isRequesting: false,
  isRequestError: false,
};

const reducer = createReducer<ICatalogState>({}, initialState);

const callSuccess = createAction<Alicanto.API.GET_CATALOG_RESPONSE>(`${NS}CALL_SUCCESS`);
reducer.on(callSuccess, (state, { next, previous, count, results }) => ({
  ...state,
  next,
  previous,
  count,
  results: [...results],
  isRequesting: false,
  isRequestError: false,
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

interface ICatalogQuery {
  search?: string;
  page?: string;
  page_size: string;
  ordering?: string;
  filter?: string;
}

const getCatalogRequestParams = ({ search, page, pageSize, ordering, filterObj }: ICatalogQueryState) => {
  const params: ICatalogQuery = {
    page_size: pageSize,
  };
  if (!_.isEmpty(search)) {
    params.search = search;
  }
  if (!_.isEmpty(page)) {
    params.page = page;
  }
  if (!_.isEmpty(ordering)) {
    params.ordering = ordering;
  }
  if (!_.isEmpty(filterObj)) {
    params.filter = JSON.stringify(filterObj);
  }
  return params;
};

export const getCatalog = (abortToken: string): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(callRequest());
    const catalogQuery = getState().catalogQuery;
    GET(
      {
        url: EndpointsConfig.CATALOG,
        params: getCatalogRequestParams(catalogQuery),
      },
      xShopHeaders,
      abortToken,
    )
      .then((resp: AxiosResponse) => {
        const data = resp.data as Alicanto.API.GET_CATALOG_RESPONSE;
        let results = data.results;
        if (catalogQuery.page !== '1') {
          const oldResults = getState().catalog.results;
          results = [...oldResults, ...results];
        }
        dispatch(callSuccess({ ...data, results }));
        resolve();
      })
      .catch(error => {
        dispatch(callFailure());
        reject(error);
      });
  });
};

export default reducer;
