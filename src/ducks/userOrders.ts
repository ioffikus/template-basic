import { createAction, createReducer } from 'redux-act';
import _ from 'lodash';
import { BusinessLogicError } from 'src/store/common';
import { deleteCart } from 'src/ducks/cart';
import { AxiosResponse } from 'axios';
import { push } from 'connected-react-router';
import { GET, POST } from 'src/core/API';
import EndpointsConfig from 'src/configs/endpoints';

export const REDUCER = 'USER_ORDERS';
const NS = `${REDUCER}__`;

export interface IUserOrdersState extends Alicanto.API.GET_USER_ORDERS_RESPONSE, Store.IReduxCommonState {
  currentPaymentId: number;
}

export const initialState: IUserOrdersState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  currentPaymentId: null,
  isRequestError: false,
  isRequesting: false,
};

const reducer = createReducer<IUserOrdersState>({}, initialState);

const getFailure = createAction(`${NS}GET_FAILURE`);
reducer.on(getFailure, state => ({
  ...state,
  isRequestError: true,
  isRequesting: false,
}));

const getSuccess = createAction<Alicanto.API.GET_USER_ORDERS_RESPONSE>(`${NS}GET_SUCCESS`);
reducer.on(getSuccess, (state, { next, previous, count, results }) => ({
  ...state,
  next,
  previous,
  count,
  results: [...results],
  isRequestError: false,
  isRequesting: false,
}));

const getRequest = createAction(`${NS}GET_REQUEST`);
reducer.on(getRequest, state => ({
  ...state,
  isRequestError: false,
  isRequesting: true,
}));

const postFailure = createAction(`${NS}POST_FAILURE`);
reducer.on(postFailure, state => ({
  ...state,
  count: 0,
  next: null,
  previous: null,
  results: [],
  currentPaymentId: null,
  isRequestError: true,
  isRequesting: false,
}));

const postSuccess = createAction(`${NS}POST_SUCCESS`);
reducer.on(postSuccess, state => ({
  ...state,
  isRequestError: false,
  isRequesting: false,
}));

const postRequest = createAction(`${NS}POST_REQUEST`);
reducer.on(postRequest, state => ({
  ...state,
  isRequestError: false,
  isRequesting: true,
}));

const setCurrentPaymentId = createAction<number>(`${NS}SET_CURRENT_PAYMENT_ID`);
reducer.on(setCurrentPaymentId, (state, currentPaymentId) => ({
  ...state,
  currentPaymentId,
}));

interface IUserOrdersQuery {
  page?: string;
  page_size?: string;
}

const getUserOrdersRequestParams = ({ page, page_size }: IUserOrdersQuery) => {
  const params: IUserOrdersQuery = {
    page_size: '3',
  };
  if (!_.isNil(page)) {
    params.page = page;
  }
  if (!_.isNil(page_size)) {
    params.page_size = page_size;
  }
  return params;
};

export const getUserOrders = (page = '1'): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(getRequest());
    GET(
      {
        url: `${EndpointsConfig.USER_ORDERS}`,
        params: getUserOrdersRequestParams({ page }),
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        const data = resp.data as Alicanto.API.GET_USER_ORDERS_RESPONSE;
        let results = data.results;
        results = results.map((item: Alicanto.Models.Order) => ({
          ...item,
          cart: {
            ...item.cart,
            total: parseFloat(_.get(item.cart, 'total', '0')),
          },
        }));
        if (page !== '1') {
          const oldResults = getState().userOrders.results;
          results = [...oldResults, ...results];
        }
        dispatch(getSuccess({ ...data, results }));
        resolve();
      })
      .catch(error => {
        dispatch(getFailure());
        reject(error);
      });
  }).then(() => {
    const currentPaymentId = getState().userOrders.currentPaymentId;
    if (process.env.BROWSER && _.isNull(currentPaymentId)) {
      const lastPaymentTimeInMs = window.localStorage.getItem('paymentTime');
      const lastPaymentId = window.localStorage.getItem('paymentId');
      if (lastPaymentTimeInMs && lastPaymentId) {
        const msNow = Date.now();
        const passingTime = msNow - parseInt(lastPaymentTimeInMs, 10);
        if (passingTime < 30 * 1000) {
          dispatch(setCurrentPaymentId(parseInt(lastPaymentId, 10)));
          setTimeout(() => {
            dispatch(setCurrentPaymentId(null));
            window.localStorage.removeItem('paymentTime');
            window.localStorage.removeItem('paymentId');
          }, 30 * 1000 - passingTime);
        }
      }
    }
  });
};

export const checkoutUserOrder = (): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    const isAuthenticated = getState().auth.isAuthenticated;
    if (!isAuthenticated) {
      const anonCheckout = getState().ui.routes.cart.errors.anonCheckout.i18n.defaultText;
      const error = new BusinessLogicError(anonCheckout);
      reject(error);
      return;
    }
    dispatch(postRequest());
    const data: Alicanto.API.POST_USER_ORDERS_BODY = { cart: getState().cart.id };
    POST(
      {
        data,
        url: EndpointsConfig.USER_ORDERS,
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        dispatch(deleteCart());
        dispatch(postSuccess());
        if (process.env.BROWSER) {
          //  TODO: move to external?
          dispatch(push('/user/orders'));
        }
        resolve();
      })
      .catch(error => {
        dispatch(postFailure());
        reject(error);
      });
  });
};

export const payAnOrder = (id: number): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    const currentPaymentId = getState().userOrders.currentPaymentId;
    if (currentPaymentId) {
      const ui = getState().ui;
      reject(new BusinessLogicError(ui.routes.user.orders.paymentWarning.i18n.defaultText));
      return;
    }
    if (process.env.BROWSER) {
      window.localStorage.setItem('paymentTime', '' + Date.now());
      window.localStorage.setItem('paymentId', `${id}`);
    }
    dispatch(setCurrentPaymentId(id));
    setTimeout(() => {
      dispatch(setCurrentPaymentId(null));
      if (process.env.BROWSER) {
        window.localStorage.removeItem('paymentTime');
        window.localStorage.removeItem('paymentId');
      }
    }, 30 * 1000);
    dispatch(postRequest());
    const data: Alicanto.API.POST_PAYMENTS_PAY_BODY = { order: id + '' };
    POST(
      {
        data,
        url: EndpointsConfig.PAY_ORDER,
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        dispatch(postSuccess());
        const data = resp.data as Alicanto.API.POST_PAYMENTS_PAY_RESPONSE;
        const redirect_url = data.redirect_to.redirect_url;
        if (process.env.BROWSER) {
          window.location.assign(redirect_url);
        }
        resolve();
      })
      .catch(error => {
        dispatch(postFailure());
        reject(error);
      });
  });
};

export default reducer;
