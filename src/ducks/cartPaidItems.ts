import { createAction, createReducer } from 'redux-act';
import { AxiosResponse } from 'axios';
import { ICardPaidItemsState } from 'src/ducks/cartPaidItems';
import _ from 'lodash';
import { GET } from 'src/core/API';
import EndpointsConfig from 'src/configs/endpoints';

export const REDUCER = 'CART_PAID_ITEMS';
const NS = `${REDUCER}__`;

export interface ICardPaidItemsState extends Alicanto.API.GET_CART_PAID_ITEMS_RESPONSE, Store.IReduxCommonState {}

export const initialState: ICardPaidItemsState = {
  next: null,
  previous: null,
  count: 0,
  results: [],
  isRequestError: false,
  isRequesting: false,
};

const reducer = createReducer<ICardPaidItemsState>({}, initialState);

const callFailure = createAction(`${NS}CALL_FAILURE`);
reducer.on(callFailure, state => ({
  ...state,
  next: null,
  previous: null,
  count: 0,
  results: [],
  isRequestError: true,
  isRequesting: false,
}));

const callSuccess = createAction<Alicanto.API.GET_CART_PAID_ITEMS_RESPONSE>(`${NS}CALL_SUCCESS`);
reducer.on(callSuccess, (state, { next, previous, count, results }) => ({
  ...state,
  next,
  previous,
  count,
  results: [...results],
  isRequestError: false,
  isRequesting: false,
}));

const callRequest = createAction(`${NS}CALL_REQUEST`);
reducer.on(callRequest, state => ({
  ...state,
  isRequesting: true,
}));

interface ICartPaidItemsQuery {
  page?: string;
  page_size?: string;
}

const getCartPaidItemsRequestParams = ({ page, page_size }: ICartPaidItemsQuery) => {
  const params: ICartPaidItemsQuery = {
    page_size: '10',
  };
  if (!_.isNil(page)) {
    params.page = page;
  }
  if (!_.isNil(page_size)) {
    params.page_size = page_size;
  }
  return params;
};

export const getCartPaidItems = (page = '1'): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(callRequest());
    GET(
      {
        url: `${EndpointsConfig.CART_PAID_ITEMS}`,
        params: getCartPaidItemsRequestParams({ page }),
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        const data = resp.data as Alicanto.API.GET_CART_PAID_ITEMS_RESPONSE;
        let results = data.results;
        if (page !== '1') {
          const oldResults = getState().cartPaidItems.results;
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
